import express from "express";
import {
  AddSocialLink,
  DeleteSocialLink,
  EditSocialLink,
  GetAllSocialLink,
} from "./developer-profile.controller.js";
import { schemaValidator } from "../../middlewares/schema-validator.js";
import { addLinkSchema } from "./schema/add-link.schema.js";
import { editLinkSchema } from "./schema/edit-link.schema.js";
import { deleteLinkSchema } from "./schema/delete-link.schema.js";

const router = express.Router();

router.post(
  "/social-link",
  schemaValidator({ body: addLinkSchema }),
  AddSocialLink,
);
router.patch(
  "/social-link",
  schemaValidator({ body: editLinkSchema }),
  EditSocialLink,
);
router.get("/social-link", GetAllSocialLink);
router.delete(
  "/social-link",
  schemaValidator({ query: deleteLinkSchema }),
  DeleteSocialLink,
);

export default router;
