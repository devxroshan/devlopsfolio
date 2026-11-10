import express from "express";
import { GetMe, GetMyDeveloperProfile } from "./user.controller.js";

const router = express.Router();

router.get("/me", GetMe);
router.get("/developer/me", GetMyDeveloperProfile);

export default router;
