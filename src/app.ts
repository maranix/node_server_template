import { Hono } from "hono";
import middleware from "./middleware";
import router from "./router";

type AppType = typeof app;

const app = new Hono();

middleware.mount(app);
router.mount(app);

export default app;
export type { AppType };
