import express from "express";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";
import type { IException } from "../interfaces/exception.js";

export const handleMongoDBException = (
  err: any,
  req: express.Request,
  res: express.Response,
) => {
  const exception: IException = {
    ok: false,
    msg: "Database error occurred",
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    details: {},
    rawError: err,
    statusCode: 500,
  };

  if (err instanceof mongoose.Error.ValidationError) {
    exception.statusCode = 400;
    exception.msg = "Database validation failed";
    exception.details.fields = Object.fromEntries(
      Object.entries(err.errors).map(([field, error]) => [
        field,
        error.message,
      ]),
    );
  } else if (err instanceof mongoose.Error.CastError) {
    exception.statusCode = 400;
    exception.msg = "Invalid database value";
    exception.details.field = err.path;
    exception.details.value = err.value;
    exception.details.expectedType = err.kind;
  } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    exception.statusCode = 404;
    exception.msg = "Database record not found";
  } else if (err instanceof MongoServerError) {
    switch (err.code) {
      case 11000:
        exception.statusCode = 409;
        exception.msg = "A record with this value already exists";
        exception.details.fields = err.keyValue ?? {};
        break;
      case 121:
        exception.statusCode = 400;
        exception.msg = "Database document validation failed";
        break;
      case 50:
        exception.statusCode = 504;
        exception.msg = "Database operation timed out";
        break;
      case 112:
        exception.statusCode = 409;
        exception.msg = "Database write conflict; retry the operation";
        break;
      default:
        exception.details.code = err.code;
    }
  } else if (
    err?.name === "MongoNetworkError" ||
    err?.name === "MongoServerSelectionError"
  ) {
    exception.statusCode = 503;
    exception.msg = "Database is temporarily unavailable";
  } else if (err?.name === "MongoTimeoutError" || err?.code === "ETIMEDOUT") {
    exception.statusCode = 504;
    exception.msg = "Database operation timed out";
  }

  res.status(exception.statusCode ?? 500).json(exception);
};
