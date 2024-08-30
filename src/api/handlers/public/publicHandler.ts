import { StatusCodes } from "http-status-codes";
import factory from "../../../config/factory";
import { createSuccessResponse } from "../../../utils/response";

const getPing = factory.createHandlers((_) => {
	return createSuccessResponse(StatusCodes.OK, "Pong!");
});

const getRoot = factory.createHandlers((_) => {
	return createSuccessResponse(StatusCodes.OK, "OK");
});

export default {
	getPing,
	getRoot,
};
