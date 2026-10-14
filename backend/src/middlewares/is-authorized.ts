import express from "express";
import { env } from "../config/env.js";
import { UnauthorizedException } from "../config/http-exceptions.js";

interface IIsAuthorized {
  for_client: boolean;
}

export const isAuthorized = ({ for_client }: IIsAuthorized) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      if (!req.user) {
        throw new UnauthorizedException("You are not logged in.");
      }

      if (req.user.is_client !== for_client) {
        throw new UnauthorizedException(
          "You are not authorized to do this operation.",
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
