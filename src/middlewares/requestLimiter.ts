import { rateLimiter } from "hono-rate-limiter";
import envConfig from "../config/envConfig";

const { RATE_LIMITER_MAX_LIMIT, RATE_LIMITER_MAX_WINDOW_MS } = envConfig;

// TODO:
//
// Improve the process of client ip indentification.
//
// [Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For)
const requestLimiter = rateLimiter({
	limit: RATE_LIMITER_MAX_LIMIT,
	windowMs: RATE_LIMITER_MAX_WINDOW_MS,
	keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "",
});

export default requestLimiter;
