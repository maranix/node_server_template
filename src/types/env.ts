import { type Static, Type } from "@sinclair/typebox";
import {
	getAbsolutePathFromRoot,
	getRelativePathFromRoot,
} from "../utils/path";

export const EnvType = Type.Union([
	Type.Literal("PRODUCTION"),
	Type.Literal("DEVELOPMENT"),
	Type.Literal("TESTING"),
]);

export const EnvConfig = Type.Object({
	NODE_ENV: EnvType,
	HOST: Type.String({ default: "localhost" }),
	PORT: Type.Integer({ default: 8080 }),
	LOGS_DIR: Type.Transform(Type.String({ default: "./logs" }))
		.Decode(getAbsolutePathFromRoot)
		.Encode(getRelativePathFromRoot),
	RATE_LIMITER_MAX_LIMIT: Type.Integer({ default: 100 }),
	RATE_LIMITER_MAX_WINDOW_MS: Type.Integer({ default: 900000 }),
});

export interface ExtendedEnvConfig extends EnvConfig {
	isDevMode(): boolean;
	isProdMode(): boolean;
	isTestMode(): boolean;
}

export type EnvType = Static<typeof EnvType>;
export type EnvConfig = Static<typeof EnvConfig>;
