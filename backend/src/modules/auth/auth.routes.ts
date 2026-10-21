import express from "express";

import {
  SignUp,
  SignIn,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
  RequestNewVerificationSession,
  IsSignedIn,
} from "./auth.controller.js";

import { schemaValidator } from "../../middlewares/schema-validator.js";

import { signUpSchema } from "./schema/signup.schema.js";
import { signInSchema } from "./schema/signin.schema.js";
import { verifyEmailSchema } from "./schema/verify-email.schema.js";
import { forgotPasswordSchema } from "./schema/forgot-password.schema.js";
import { resetPasswordSchema } from "./schema/reset-password.schema.js";
import { newVerificationSession } from "./schema/new-verification-session.schema.js";
import { isAuthenticated } from "../../middlewares/is-authenticated.js";

const router = express.Router();

router.post("/signup",schemaValidator({ body: signUpSchema }), SignUp);
router.post("/signin",schemaValidator({ body: signInSchema }), SignIn);
router.patch("/verify-email", schemaValidator({ body: verifyEmailSchema }), VerifyEmail);
router.patch("/new-verification-session", schemaValidator({ query: newVerificationSession }), RequestNewVerificationSession);
router.get("/forgot-password",schemaValidator({ query: forgotPasswordSchema }), ForgotPassword);
router.patch("/reset-password", schemaValidator({ body: resetPasswordSchema }), ResetPassword);
router.get("/is-signed-in", IsSignedIn)

export default router;
