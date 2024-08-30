import type { Static, TSchema } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

const ResponseObject = Type.Any();

export const SuccessResponseBuilder = <T extends TSchema>(dataSchema: T) =>
	Type.Object({
		status: Type.Optional(Type.Literal("success", { default: "success" })),
		data: Type.Union([dataSchema, Type.Null()], { default: null }),
	});

export const FailureResponseBuilder = <T extends TSchema>(dataSchema: T) =>
	Type.Object({
		status: Type.Optional(Type.Literal("failure", { default: "failure" })),
		data: dataSchema,
	});

export const ErrorResponseBuilder = <T extends TSchema>(dataSchema: T) =>
	Type.Object({
		status: Type.Optional(Type.Literal("error", { default: "error" })),
		message: Type.String(),
		code: Type.Optional(Type.String()),
		data: Type.Optional(Type.Union([dataSchema, Type.Null(), Type.Any()])),
	});

export const ResponseBuilder = <T extends TSchema>(dataSchema: T) =>
	Type.Union([
		SuccessResponseBuilder(dataSchema),
		FailureResponseBuilder(dataSchema),
		ErrorResponseBuilder(dataSchema),
	]);

export const StandardResponseSchema = ResponseBuilder(ResponseObject);
export const SuccessResponseSchema = SuccessResponseBuilder(ResponseObject);
export const FailureResponseSchema = FailureResponseBuilder(ResponseObject);
export const ErrorResponseSchema = ErrorResponseBuilder(ResponseObject);

export type StandardResponse = Static<typeof StandardResponseSchema>;
export type SuccessResponse = Static<typeof SuccessResponseSchema>;
export type FailureResponse = Static<typeof FailureResponseSchema>;
export type ErrorResponse = Static<typeof ErrorResponseSchema>;
