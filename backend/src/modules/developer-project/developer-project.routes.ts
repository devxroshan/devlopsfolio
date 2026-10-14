import express from "express";
import { isAuthenticated } from "../../middlewares/is-authenticated.js";
import { isAuthorized } from "../../middlewares/is-authorized.js";
import { schemaValidator } from "../../middlewares/schema-validator.js";
import { createProjectSchema } from "./schema/create-project.schema.js";
import {
  CreateProject,
  DeleteProject,
  EditProject,
  GetAllProject,
  GetProject,
} from "./developer-project.controller.js";
import { getProjectSchema } from "./schema/get-project.schema.js";
import { editProjectSchema } from "./schema/edit-project.schema.js";
import { deleteProjectSchema } from "./schema/delete-project.schema.js";

const router = express.Router();

router.post("/", schemaValidator({ body: createProjectSchema }), CreateProject);
router.get("/all", GetAllProject);
router.get("/", schemaValidator({ query: getProjectSchema }), GetProject);
router.patch("/", schemaValidator({ body: editProjectSchema }), EditProject);
router.delete("/", schemaValidator({ query: deleteProjectSchema }), DeleteProject);

export default router;
