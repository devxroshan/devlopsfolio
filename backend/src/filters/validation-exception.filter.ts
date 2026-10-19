import express from "express";
import z from "zod";

import type { IException } from "../interfaces/exception.js";

import { env } from "../config/env.js";

export const handleValidationFilter = (
  err: z.ZodError,
  req: express.Request,
  res: express.Response,
) => {
  const exception: IException = {
    ok: false,
    msg: "Validation Error",
    path: req.originalUrl,
    code: "VALIDATION",
    timestamp: new Date().toISOString(),
    details: err.issues.map((issue) => ({
      field: issue.path.join("."),
      code: issue.code,
      msg: issue.message,
    })),
    rawError: env.isDevelopment ? err : {},
  };

  res.status(400).json(exception);
};
