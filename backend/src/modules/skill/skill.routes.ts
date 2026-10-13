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
import { isLoggedIn } from "../../middlewares/is-logged-in.js";

const router = express.Router();

router.post("/",isLoggedIn, schemaValidator({ body: addSkillSchema }), AddSkill);
router.get("/",isLoggedIn, GetAllSkill);
router.patch("/",isLoggedIn, schemaValidator({ body: editSkillSchema }), EditSkill);
router.delete("/",isLoggedIn, schemaValidator({ query: deleteSkillSchema }), DeleteSkill);

export default router;
