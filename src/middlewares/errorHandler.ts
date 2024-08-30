import type { ErrorHandler, NotFoundHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";
import { createErrorResponse } from "../utils/response";

const notFoundHandler: NotFoundHandler = (_) => {
	return createErrorResponse(StatusCodes.NOT_FOUND, "Not Found");
};

const errorHandler: ErrorHandler = (err, _) => {
	if (err instanceof HTTPException) {
		return createErrorResponse(err.status, err.message);
	}

	return createErrorResponse(StatusCodes.SERVICE_UNAVAILABLE, err.message);
};

export { notFoundHandler, errorHandler };
