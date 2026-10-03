import express from "express";
import jwt from "jsonwebtoken";
import z from "zod";

// interaaces
import type { IException } from "../interfaces/exception.js";

import { HttpException } from "../config/http-exceptions.js";
import { handleHttpException } from "./http-exception.filter.js";
import { handleJwtExceptionFilter } from "./jwt-exception.filter.js";
import { handleValidationFilter } from "./validation-exception.filter.js";



export const allExceptionFilter = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const exception: IException = {
    ok: false,
    msg: err.message || "Internal Server Error",
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    details: err.details || {},
  };

  if (err instanceof HttpException)
    return handleHttpException(err, req, res);
  else if(err instanceof jwt.JsonWebTokenError)
    return handleJwtExceptionFilter(err, req, res);
  else if(err instanceof z.ZodError)
    return handleValidationFilter(err, req, res);

  res.status(err.statusCode || 500).json(exception);
};