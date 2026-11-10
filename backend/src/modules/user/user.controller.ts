import {
  asyncRequestHandler,
  type RequestHandlerParams,
} from "../../utils/asyncRequestHandler.js";

import { DeveloperProfile } from "../../models/developer-profile.model.js";

const getMe = async (handler: RequestHandlerParams) => {
  let developerProfile = null;

  if (!handler.req.user?.is_client) {
    developerProfile = await DeveloperProfile.findOne({
      user_id: handler.req.user?._id as string,
    });

    if (!developerProfile) {
      return {
        ok: false,
        msg: "Developer profile not found.",
        data: null,
      };
    }
  }

  return {
    ok: true,
    msg: "User details fetched successfully.",
    data: { ...handler.req.user, developer_profile: developerProfile },
  };
};

export const GetMe = asyncRequestHandler(getMe);
