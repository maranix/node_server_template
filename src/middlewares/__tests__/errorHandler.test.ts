import { Hono } from "hono";
import { getQueryParam } from "hono/utils/url";
import { describe, expect, test } from "vitest";
import { notFoundHandler } from "../errorHandler";

// TODO: handle non standard http method: ["OPTIONS", "HEAD", "CONNECT", "TRACE"]
describe("Middleware", () => {
	describe("notFoundHandler", () => {
		const app = new Hono();

		app.get("/", (c) => c.json("ok"));

		// Path Parameters
		app.get("/greet/:name", (c) => c.json(c.req.param("name")));

		// Query Parameters
		app.get("/greet", (c) => c.json(c.req.query()));

		app.notFound(notFoundHandler);

		test("handles all methods", async () => {
			const methods = ["POST", "GET", "PUT", "DELETE", "PATCH"];

			for (const method of methods) {
				const res = await app.request("/unknown", { method });

				expect(res.status).toBe(404);
				expect(await res.json()).toEqual({
					status: "error",
					message: "Not Found",
				});
			}
		});

		test("handles unknown route", async () => {
			const res = await app.request("/unknown");

			expect(res.status).toBe(404);
			expect(await res.json()).toEqual({
				status: "error",
				message: "Not Found",
			});
		});

		test("handles known routes", async () => {
			const res = await app.request("/");

			expect(res.status).toBe(200);
			expect(await res.json()).toEqual("ok");
		});

		test("handles unknown route path parameters", async () => {
			const res = await app.request("/unknwon/hello");

			expect(res.status).toBe(404);
			expect(await res.json()).toEqual({
				status: "error",
				message: "Not Found",
			});
		});

		test("handles known route path parameters", async () => {
			const res = await app.request("/greet/hello");

			expect(res.status).toBe(200);
			expect(await res.json()).toEqual("hello");
		});

		test("handles unknown routes with query parameters", async () => {
			const res = await app.request("/unknown?param=value");

			expect(res.status).toBe(404);
			expect(await res.json()).toEqual({
				status: "error",
				message: "Not Found",
			});
		});

		test("handles known routes with query parameters", async () => {
			const query = "name=hello&mode=test";
			const res = await app.request(`/greet?${query}`);
			const body = getQueryParam(`http://localhost:8080/greet?${query}`);

			expect(res.status).toBe(200);
			expect(await res.json()).toEqual(body);
		});

		test("handles empty paths or extra slashes", async () => {
			const paths = ["//", "/test//", "/test/"];

			for (const path of paths) {
				const res = await app.request(path);

				expect(res.status).toBe(404);
				expect(await res.json()).toEqual({
					status: "error",
					message: "Not Found",
				});
			}
		});

		test("sets correct response headers", async () => {
			const res = await app.request("/unknown");

			expect(res.status).toBe(404);
			expect(res.headers.get("Content-Type")).toBe("application/json");
		});
	});
});
