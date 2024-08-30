import { Value } from "@sinclair/typebox/value";
import dotenv from "dotenv";
import { EnvConfig, type ExtendedEnvConfig } from "../types/env";

const parsedConfig = Value.Parse(EnvConfig, dotenv.config().parsed);

const envConfig: ExtendedEnvConfig = {
	...parsedConfig,
	isTestMode: () => {
		return envConfig.NODE_ENV === "TESTING";
	},
	isProdMode: () => {
		return envConfig.NODE_ENV === "PRODUCTION";
	},
	isDevMode: () => {
		return envConfig.NODE_ENV === "DEVELOPMENT";
	},
};

export default envConfig;
