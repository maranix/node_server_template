import type { AppType } from "./app";

import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import requestLimiter from "./middlewares/requestLimiter";
import requestLogger from "./middlewares/requestLogger";

const mount = (app: AppType) => {
	app.use(requestLogger);
	app.use(requestLimiter);
	app.use(cors());
	app.use(secureHeaders());
	app.notFound(notFoundHandler);
	app.onError(errorHandler);
};

export default { mount };
