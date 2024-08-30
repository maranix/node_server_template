import winston from "winston";
import type { LogLevels, LogTransporter } from "../types/logging";
import { createDirSync } from "../utils/fs";
import { getAbsolutePathFromRoot } from "../utils/path";
import envConfig from "./envConfig";

const { LOGS_DIR, isProdMode } = envConfig;

const logsStorage = getAbsolutePathFromRoot(LOGS_DIR);

createDirSync(logsStorage, isProdMode());

//
// Logger Configuration
//

const LEVELS: LogLevels = {
	error: 0,
	warn: 1,
	debug: 2,
	info: 3,
	http: 4,
};

type LogLevel = keyof typeof LEVELS;

const COLORS: Record<LogLevel, string> = {
	error: "red",
	warn: "yellow",
	debug: "blue",
	info: "cyan",
	http: "magenta",
};

const timestampFormat = "YYYY-MM-DD HH:mm:ss";

const logPrintFormat = (info: winston.Logform.TransformableInfo) => {
	return `${info.timestamp}\t[${info.level}]: ${info.message}`;
};

const getLogLevelFromEnv = (isInProd: boolean): LogLevel => {
	return isInProd ? "info" : "http";
};

const createTransports = (dir: string, isInProd: boolean): LogTransporter[] => {
	const transports = [];

	for (const level of Object.keys(LEVELS)) {
		const transport = new winston.transports.File({
			level,
			filename: `${dir}/${level}.log`,
			format: winston.format.combine(
				winston.format.timestamp({ format: timestampFormat }),
				winston.format.printf(logPrintFormat),
			),
		});

		transports.push(transport);
	}

	transports.push(
		new winston.transports.Console({
			level: getLogLevelFromEnv(isInProd),
			format: winston.format.combine(
				winston.format.timestamp({ format: timestampFormat }),
				winston.format.printf(logPrintFormat),
				winston.format.colorize({ all: true, message: true }),
			),
		}),
	);

	return transports;
};

winston.addColors(COLORS);

const log = winston.createLogger({
	levels: LEVELS,
	transports: createTransports(logsStorage, isProdMode()),
});

export default log;
