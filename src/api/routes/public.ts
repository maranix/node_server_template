import { Hono } from "hono";
import publicHandler from "../handlers/public/publicHandler";

const route = new Hono();

route.get("/", ...publicHandler.getRoot);

route.get("/ping", ...publicHandler.getPing);

export const publicRoutes = route.basePath("/");
