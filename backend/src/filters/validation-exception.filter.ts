import express from "express";
import z from "zod";

import type { IException } from "../interfaces/exception.js";


export const handleValidationFilter = (
  err: z.ZodError,
  req: express.Request,
  res: express.Response,
) => {
  const exception: IException = {
    ok: false,
    msg: "Validation Error",
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    details: err.issues.map((issue) => [issue.path.join("."), issue.message]),
  };

  res.status(400).json(exception);
};