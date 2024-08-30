import { Value } from "@sinclair/typebox/value";
import {
	ErrorResponseSchema,
	FailureResponseSchema,
	SuccessResponseSchema,
} from "../types/response";

import type {
	ErrorResponse,
	FailureResponse,
	SuccessResponse,
} from "../types/response";

const createSuccessResponse = <T>(status: number, data?: T): Response => {
	const json = Value.Parse(SuccessResponseSchema, {
		data: data,
	} satisfies SuccessResponse);

	return Response.json(json, { status });
};

const createFailureResponse = <T>(status: number, data: T): Response => {
	const json = Value.Parse(FailureResponseSchema, {
		data: data,
	} satisfies FailureResponse);

	return Response.json(json, { status });
};

const createErrorResponse = <T>(
	status: number,
	message: string,
	data?: T,
	code?: string,
): Response => {
	const json = Value.Parse(ErrorResponseSchema, {
		message,
		data: data,
		code,
	} satisfies ErrorResponse);

	return Response.json(json, { status });
};

export { createSuccessResponse, createFailureResponse, createErrorResponse };
