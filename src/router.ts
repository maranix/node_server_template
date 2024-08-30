import { publicRoutes } from "./api/routes/public";
import type { AppType } from "./app";

const mount = (app: AppType) => {
	app.route("/", publicRoutes);
};

export default {
	mount,
};
