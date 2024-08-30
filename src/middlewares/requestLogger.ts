import { createMiddleware } from "hono/factory";
import log from "../config/logging";

const requestLogger = createMiddleware(async (c, next) => {
	const start = Date.now();

	await next();

	const end = Date.now();

	const { method, url } = c.req;
	const { status } = c.res;

	log.http(`${method} ${url} ${status} ${end - start}ms`);
});

export default requestLogger;
