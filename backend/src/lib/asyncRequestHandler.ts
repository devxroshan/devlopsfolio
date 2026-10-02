import express from "express";

interface HandlerResponse {
  ok: boolean;
  msg: string;
  data?: any;
  statusCode?: number;
}

type AsyncRequestHandler = (
  req: express.Request,
  res: express.Response,
  next?: express.NextFunction
) => Promise<void | HandlerResponse>;

export const asyncRequestHandler = (handler: AsyncRequestHandler) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    handler(req, res, next)
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
        next(error);
      });
  };
};
