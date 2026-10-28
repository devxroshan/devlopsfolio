import {
  asyncRequestHandler,
  type RequestHandlerParams,
} from "../../utils/asyncRequestHandler.js";

const getMe = async (handler: RequestHandlerParams) => {
  return {
    ok: true,
    msg: "User details fetched successfully.",
    data: handler.req.user,
  };
};

export const GetMe = asyncRequestHandler(getMe);
