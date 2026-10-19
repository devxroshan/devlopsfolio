import express, { raw } from "express";
import jwt from "jsonwebtoken";

import type { IException } from "../interfaces/exception.js";

import { env } from "../config/env.js";

export const handleJwtExceptionFilter = (
  err: unknown,
  req: express.Request,
  res: express.Response,
) => {
  let errObj: IException = {
    ok: false,
    msg: "Invalid token. Please log in again.",
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    details: {},
    code: "ACCESS_TOKEN",
    rawError: env.isDevelopment ? err : {},
  };

  if (err instanceof jwt.JsonWebTokenError) {
    errObj.msg = "Invalid token. Please log in again.";
  }

  if (err instanceof jwt.TokenExpiredError) {
    errObj.msg = "Token has expired. Please log in again.";
  }

  if (err instanceof jwt.NotBeforeError) {
    errObj.msg = "Token is not active yet. Please log in again.";
  }

  res.status(401).json(errObj);
};
