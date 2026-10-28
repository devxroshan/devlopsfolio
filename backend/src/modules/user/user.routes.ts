import express from "express";
import { GetMe } from "./user.controller.js";

const router = express.Router();

router.get("/me", GetMe);

export default router;
