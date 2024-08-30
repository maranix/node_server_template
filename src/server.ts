import { serve } from "@hono/node-server";
import app from "./app";
import envConfig from "./config/envConfig";
import log from "./config/logging";

const { NODE_ENV, HOST, PORT } = envConfig;

const server = serve(
	{
		fetch: app.fetch,
		hostname: HOST,
		port: PORT,
	},
	() => {
		log.info(`${NODE_ENV} Server running at ${HOST}:${PORT}`);
	},
);

const onCloseSignal = () => {
	server.close((err) => {
		handleServerCloseError(err);
		process.exit();
	});

	setTimeout(() => process.exit(1), 10000);
};

const handleServerCloseError = (err: Error | undefined) => {
	if (!err) return;

	log.error("An error occurred while starting the server");
	log.error(err);

	process.exit(1);
};

process.on("SIGTERM", onCloseSignal);
process.on("SIGINT", onCloseSignal);
