import { NotFoundException } from "../../config/http-exceptions.js";
import { DeveloperProfile } from "../../models/developer-profile.model.js";
import type { RequestHandlerParams } from "../../utils/asyncRequestHandler.js";
import { asyncRequestHandler } from "../../utils/asyncRequestHandler.js";
import type { EditLinkSchema } from "./schema/edit-link.schema.js";

const addSocialLink = async (handler: RequestHandlerParams) => {
  const link = handler.req.body.link as string;

  const added = await DeveloperProfile.findOneAndUpdate(
    { user_id: handler.req.user?._id as string },
    { $addToSet: { social_links: link } },
    { new: true },
  );

  if (!added) {
    throw new NotFoundException("Developer profile not found.");
  }

  return {
    msg: "Social link added successfully.",
  };
};
const editSocialLink = async (handler: RequestHandlerParams) => {
  const editInfo = handler.req.body as EditLinkSchema;

  const updated = await DeveloperProfile.findOneAndUpdate(
    {
      user_id: handler.req.user?._id as string,
      social_links: {
        $eq: editInfo.prev_link,
        $ne: editInfo.new_link,
      },
    },
    { $set: { "social_links.$": editInfo.new_link } },
    { new: true },
  );

  if (!updated) {
    throw new NotFoundException("Developer profile or social link not found.");
  }

  return {
    msg: "Social link updated successfully.",
  };
};
const getAllSocialLink = async (handler: RequestHandlerParams) => {
  const profile = await DeveloperProfile.findOne({
    user_id: handler.req.user?._id as string,
  });

  if (!profile) {
    throw new NotFoundException("Developer profile not found.");
  }

  const socialLinks = profile.social_links ?? [];

  return {
    msg:
      socialLinks.length > 0
        ? "Social links fetched successfully."
        : "No social links yet.",
    data: socialLinks,
  };
};
const deleteSocialLink = async (handler: RequestHandlerParams) => {
  const link = handler.req.query.link as string;

  const deleted = await DeveloperProfile.findOneAndUpdate(
    {
      user_id: handler.req.user?._id as string,
      social_links: link,
    },
    { $pull: { social_links: link } },
    { new: true },
  );

  if (!deleted) {
    throw new NotFoundException("Developer profile or social link not found.");
  }

  return {
    msg: "Social link deleted successfully.",
  };
};

export const AddSocialLink = asyncRequestHandler(addSocialLink);
export const EditSocialLink = asyncRequestHandler(editSocialLink);
export const GetAllSocialLink = asyncRequestHandler(getAllSocialLink);
export const DeleteSocialLink = asyncRequestHandler(deleteSocialLink);
