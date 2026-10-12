import express from "express";
import mongoose from "mongoose";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { asyncRequestHandler } from "../../lib/asyncRequestHandler.js";

// types
import type { RequestHandlerParams } from "../../lib/asyncRequestHandler.js";

// Models
import { User } from "../../models/user.model.js";
import { VerificationSession } from "../../models/verification-session.model.js";

// errors
import {
  BadRequestException,
  NotFoundException,
} from "../../config/http-exceptions.js";

// libs
import { renderTemplate } from "../../lib/renderTemplate.js";
import { sendEmail } from "../../lib/sendEmail.js";
import { env } from "../../config/env.js";

const signUp = async (handlerParams: RequestHandlerParams) => {
  const EXPIRY_MINUTES = 5;

  const userInfo = handlerParams.req.body;

  const hashedPassword = await argon2.hash(userInfo.password);

  const session = handlerParams.mongooseSession;

  const [newUser] = await User.create(
    [
      {
        ...userInfo,
        password: hashedPassword,
      },
    ],
    { session: session as mongoose.ClientSession },
  );

  const [verificationSession] = await VerificationSession.create(
    [
      {
        expires_at: new Date(Date.now() + EXPIRY_MINUTES * 60 * 1000),
        data: newUser?.id as string,
      },
    ],
    { session: session as mongoose.ClientSession },
  );

  const verificationLink = `${env.FRONTEND}/email-verification?token=${verificationSession?.id}`;

  const verificationHtml = await renderTemplate("email-verification.html", {
    appName: process.env.APP_NAME as string,
    name: newUser?.name as string,
    verificationUrl: verificationLink,
    expiryMinutes: EXPIRY_MINUTES,
    currentYear: new Date().getFullYear(),
  });

  // send email
  if (env.isDevelopment) {
    await sendEmail({
      to: newUser?.email as string,
      subject: "Email Verification",
      html: verificationHtml,
    });
  }

  return {
    ok: true,
    msg: "Sign up successfully. Check your email for email verification link.",
    data: newUser,
  };
};

const verifyEmail = async (handler: RequestHandlerParams) => {
  const token = handler.req.body.token as string;

  if (!token || typeof token != "string") {
    throw new BadRequestException("Token is required.");
  }

  const isVerificationSession = await VerificationSession.findOne({
    _id: token,
    expires_at: {
      $gt: new Date(),
    },
  });

  if (!isVerificationSession) {
    throw new NotFoundException(
      "Verification token session expired. Request new one",
    );
  }

  await User.updateOne(
    { _id: isVerificationSession.data },
    {
      $set: {
        is_email_verified: true,
      },
    },
  );

  await VerificationSession.deleteOne({ _id: token });

  return {
    ok: true,
    msg: "Email verified successfully.",
  };
};

const signIn = async (handler: RequestHandlerParams) => {
  const EXPIRY_MINUTES = 5;
  const ACESS_TOKEN_EXPIRY_DAY = 30;

  const { email, password } = handler.req.query as {
    email: string;
    password: string;
  };

  if (!email || !password) {
    throw new BadRequestException("Email and Password are required.", {
      email,
      password,
    });
  }

  const isUser = await User.findOne({ email });

  if (!isUser) {
    throw new NotFoundException("User not found.");
  }

  if (!isUser.is_email_verified) {
    const verificationSession = await VerificationSession.create({
      expires_at: new Date(Date.now() + EXPIRY_MINUTES * 60 * 1000),
      data: isUser.id,
    });

    const verificationLink = `${env.FRONTEND}/email-verification?token=${verificationSession.id}`;

    const verificationHtml = await renderTemplate("email-verification.html", {
      appName: process.env.APP_NAME as string,
      name: isUser.name,
      verificationUrl: verificationLink,
      expiryMinutes: EXPIRY_MINUTES,
      currentYear: new Date().getFullYear(),
    });

    if (env.isDevelopment) {
      await sendEmail({
        to: isUser.email,
        subject: "Email Verification",
        html: verificationHtml,
      });
    }

    throw new BadRequestException("Email is not verified.");
  }

  const isPassword = await argon2.verify(isUser.password, password);

  if (!isPassword) {
    throw new BadRequestException("Wrong password.");
  }

  const accessToken = await jwt.sign(
    { sub: isUser.id },
    process.env.JWT_SECRET!,
    { algorithm: "HS256", expiresIn: "30d" },
  );

  handler.res
    .status(200)
    .cookie("access-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "dev",
      maxAge: ACESS_TOKEN_EXPIRY_DAY * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    })
    .json({
      ok: true,
      msg: "Logged in successfully.",
    });
};

const forgotPassword = async (handler: RequestHandlerParams) => {
  const EXPIRY_MINUTES = 10;

  const email = handler.req.query.email as string;

  if (!email) {
    throw new BadRequestException("Email is required.");
  }

  const isUser = await User.findOne({ email });

  if (!isUser) {
    throw new NotFoundException("User not found.");
  }

  const verificationTokenExpiresAt = new Date(
    Date.now() + EXPIRY_MINUTES * 60 * 1000,
  );

  const forgotPasswordSession = await VerificationSession.create({
    expires_at: verificationTokenExpiresAt,
    data: email,
  });

  const resetUrl = `${env.FRONTEND}/reset-password?token=${forgotPasswordSession.id}`;

  const forgotPasswordHtml = await renderTemplate("forgot-password.html", {
    appName: process.env.APP_NAME as string,
    name: isUser.name,
    expiryMinutes: EXPIRY_MINUTES,
    resetUrl,
    currentYear: new Date().getFullYear(),
  });

  if (env.isDevelopment) {
    await sendEmail({
      to: isUser.email,
      subject: "Reset Password",
      html: forgotPasswordHtml,
    });
  }

  return {
    ok: true,
    msg: "Check your email for Password reset link.",
  };
};

const resetPassword = async (handler: RequestHandlerParams) => {
  const { newPassword, confirmPassword } = handler.req.body as {
    newPassword: string;
    confirmPassword: string;
  };

  const token = handler.req.query.token as string;

  if (!token) {
    throw new BadRequestException("Token is required.");
  }

  const isVerificationSession = await VerificationSession.findOne({
    _id: token,
    expires_at: {
      $gt: new Date(),
    },
  });

  if (!isVerificationSession) {
    throw new BadRequestException("Invalid or expired token.");
  }

  const isUser = await User.findOne({ email: isVerificationSession.data });

  if (!isUser) {
    throw new NotFoundException("User not found.");
  }

  const hashedPassword = await argon2.hash(confirmPassword);

  await User.updateOne(
    { _id: isUser.id },
    {
      $set: {
        password: hashedPassword,
      },
    },
  );

  await VerificationSession.deleteOne({ _id: token });

  return {
    ok: true,
    msg: "Password reset successfully.",
  };
};

export const SignUp = asyncRequestHandler(signUp, {
  allowMongooseSession: true,
});
export const SignIn = asyncRequestHandler(signIn);
export const VerifyEmail = asyncRequestHandler(verifyEmail);
export const ForgotPassword = asyncRequestHandler(forgotPassword);
export const ResetPassword = asyncRequestHandler(resetPassword);
