import {
  asyncRequestHandler,
  type RequestHandlerParams,
} from "../../utils/asyncRequestHandler.js";

import { DeveloperProfile } from "../../models/developer-profile.model.js";

const getMe = async (handler: RequestHandlerParams) => {
  return {
    ok: true,
    msg: "User details fetched successfully.",
    data: handler.req.user,
  };
};

const getMyDeveloperProfile = async (handler: RequestHandlerParams) => {
  const developerProfile = await DeveloperProfile.findOne({
    user_id: handler.req.user?._id as string,
  });

  return {
    ok: true,
    msg: developerProfile
      ? "Developer profile fetched successfully."
      : "Developer profile not found.",
    data: developerProfile ?? null,
  };
};

export const GetMe = asyncRequestHandler(getMe);
export const GetMyDeveloperProfile = asyncRequestHandler(getMyDeveloperProfile);
