import express from "express";
import { schemaValidator } from "../../middlewares/schema-validator.js";
import { addSkillSchema } from "./schema/add-skill.schema.js";
import {
  AddSkill,
  DeleteSkill,
  EditSkill,
  GetAllSkill,
} from "./skill.controller.js";
import { editSkillSchema } from "./schema/edit-skill.schema.js";
import { deleteSkillSchema } from "./schema/delete-skill.schema.js";
import { isAuthenticated } from "../../middlewares/is-authenticated.js";
import { isAuthorized } from "../../middlewares/is-authorized.js";

const router = express.Router();

router.post("/",isAuthenticated,isAuthorized({ for_client: false }), schemaValidator({ body: addSkillSchema }), AddSkill);
router.get("/",isAuthenticated,isAuthorized({ for_client: false }), GetAllSkill);
router.patch("/",isAuthenticated,isAuthorized({ for_client: false }), schemaValidator({ body: editSkillSchema }), EditSkill);
router.delete("/",isAuthenticated,isAuthorized({ for_client: false }), schemaValidator({ query: deleteSkillSchema }), DeleteSkill);

export default router;
