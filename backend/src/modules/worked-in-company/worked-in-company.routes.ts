import express from "express";

import { schemaValidator } from "../../middlewares/schema-validator.js";
import { createWorkedInCompanySchema } from "./schema/create.schema.js";
import {
  CreateWorkedInCompany,
  DeleteWorkedInCompany,
  GetAllWorkedInCompany,
} from "./worked-in-company.controller.js";
import { deleteWorkedInCompanySchema } from "./schema/delete.schema.js";

const router = express.Router();

router.post(
  "/",
  schemaValidator({ body: createWorkedInCompanySchema }),
  CreateWorkedInCompany,
);
router.get("/all", GetAllWorkedInCompany);
router.delete(
  "/",
  schemaValidator({ query: deleteWorkedInCompanySchema }),
  DeleteWorkedInCompany,
);

export default router;
