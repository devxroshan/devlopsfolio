import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { APP_CONSTANTS } from "../config/constants.js";
import {
  BadRequestException,
  NotFoundException,
} from "../config/http-exceptions.js";
import { env } from "../config/env.js";
import { User } from "../models/user.model.js";
import type { IAuthenticatedUser } from "../interfaces/authenticated.js";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const accessToken = req.cookies[APP_CONSTANTS.AUTH_COOKIE_NAME];

    if (!accessToken) {
      throw new BadRequestException("Access token required.");
    }

    const isValidAccessToken = jwt.verify(accessToken, env.JWT_SECRET) as {
      sub: string;
    };

    if (!isValidAccessToken.sub || typeof isValidAccessToken.sub !== "string") {
      throw new BadRequestException("Invalid token.");
    }

    if (!mongoose.Types.ObjectId.isValid(isValidAccessToken.sub)) {
      throw new BadRequestException("Invalid token subject.");
    }

    const isUser = await User.findById(isValidAccessToken.sub);

    if (!isUser) {
      throw new NotFoundException("User not found. Please login.");
    }

    req.user = {
      ...isUser.toObject(),
      _id: isUser._id.toString(),
    } as IAuthenticatedUser;

    next();
  } catch (error) {
    next(error);
  }
};
