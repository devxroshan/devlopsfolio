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

const router = express.Router();

router.post("/", schemaValidator({ body: addSkillSchema }), AddSkill);
router.get("/", GetAllSkill);
router.patch("/", schemaValidator({ body: editSkillSchema }), EditSkill);
router.delete("/", schemaValidator({ query: deleteSkillSchema }), DeleteSkill);

export default router;
