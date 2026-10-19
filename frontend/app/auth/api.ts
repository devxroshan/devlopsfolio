import { api } from "../lib/api";
import { APISuccess } from "../types/api-success";
import { schemaValidator } from "../utils/schema-validator";
import {
  ForgotPasswordInfo,
  forgotPasswordSchema,
} from "./schema/forgot-password.schema";
import {
  ResetPasswordInfo,
  resetPasswordSchema,
} from "./schema/reset-password.schema";
import { SignInInfo, signInSchema } from "./schema/signin.schema";
import { signUpSchema } from "./schema/signup.schema";
import {
  VerifyEmailInfo,
  verifyEmailSchema,
} from "./schema/verify-email.schema";

import { SignUpInfo } from "./schema/signup.schema";

export const SignUpAPI = async (data: SignUpInfo) => {
  await schemaValidator(signUpSchema, data);
  return await api.post<APISuccess, APISuccess, SignUpInfo>(
    "/auth/signup",
    data,
  );
};
export const SignInAPI = async (data: SignInInfo) => {
  await schemaValidator(signInSchema, data);
  return await api.post<APISuccess, APISuccess, SignInInfo>(
    `/auth/signin`,
    data,
  );
};
export const VerifyEmailAPI = async (data: VerifyEmailInfo) => {
  await schemaValidator(verifyEmailSchema, data);
  return await api.patch<APISuccess, APISuccess, VerifyEmailInfo>(
    "/auth/verify-email",
    data,
  );
};
export const ForgotPasswordAPI = async (data: ForgotPasswordInfo) => {
  await schemaValidator(forgotPasswordSchema, data);
  return await api.get<APISuccess, APISuccess, ForgotPasswordInfo>(
    `/auth/forgot-password?email=${data.email}`,
  );
};
export const ResetPasswordAPI = async (data: ResetPasswordInfo) => {
  await schemaValidator(resetPasswordSchema, data);
  return await api.patch<APISuccess, APISuccess, ResetPasswordInfo>(
    "/auth/reset-password",
    data,
  );
};
export const RequestNewVerificationSessionAPI = async (data: SignUpInfo) => {
  return await api.patch("/auth/new-verification-session", data);
};
