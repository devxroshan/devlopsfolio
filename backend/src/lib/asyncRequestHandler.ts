import express from "express";
import mongoose from "mongoose";
import { InternalServerException } from "../config/http-exceptions.js";

interface HandlerResponse {
  ok: boolean;
  msg: string;
  data?: any;
  statusCode?: number;
}

export interface RequestHandlerParams {
  req: express.Request;
  res: express.Response;
  next?: express.NextFunction;
  mongooseSession?: mongoose.ClientSession | undefined;
}

type AsyncRequestHandler = (
  handlerParams: RequestHandlerParams,
) => Promise<HandlerResponse | void>;

type Options = {
  allowMongooseSession?: boolean;
};

export const asyncRequestHandler = (
  handler: AsyncRequestHandler,
  options: Options = { allowMongooseSession: false },
) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    let session: mongoose.ClientSession | undefined = undefined;

    if (options.allowMongooseSession) {
      session = await mongoose.startSession();
    }

    handler({ req, res, mongooseSession: session, next })
      .then((response) => {
        if (res.headersSent) return;
        else if (response !== undefined) {
          res.status(response.statusCode || 200).json({
            ok: response.ok,
            msg: response.msg,
            data: response.data,
          });
        } else {
          res.status(200).json({
            ok: true,
            msg: "Default controller response.",
          });
        }
      })
      .catch((error) => {
        if (session?.inTransaction()) {
          session.abortTransaction();
        }
        next(error);
      })
      .finally(() => {
        if (session) {
          session.endSession();
        }
      });
  };
};
