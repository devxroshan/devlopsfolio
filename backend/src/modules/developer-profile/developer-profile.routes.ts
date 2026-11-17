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

router.post("/", schemaValidator({ body: addLinkSchema }), AddSocialLink);
router.patch("/", schemaValidator({ body: editLinkSchema }), EditSocialLink);
router.get("/", GetAllSocialLink);
router.delete(
  "/",
  schemaValidator({ query: deleteLinkSchema }),
  DeleteSocialLink,
);

export default router;
