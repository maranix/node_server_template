import type {
	ConsoleTransportInstance,
	FileTransportInstance,
} from "winston/lib/winston/transports";

type LogLevels = {
	error: number;
	warn: number;
	debug: number;
	info: number;
	http: number;
};

type LogTransporter = FileTransportInstance | ConsoleTransportInstance;

export type { LogLevels, LogTransporter };
