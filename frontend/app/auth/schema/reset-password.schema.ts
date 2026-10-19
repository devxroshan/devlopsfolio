import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z.string(),
    confirmPassword: z.string(),
    token: z.string(),
  })
  .superRefine((val, ctx) => {
    if (
      val.newPassword !== val.confirmPassword ||
      (val.newPassword === "" && val.confirmPassword === "")
    ) {
      ctx.addIssue({
        message: "Passwords do not match",
        code: "PASSWORD_MISMATCH",
        path: ["confirmPassword"],
      } as any);
    }

    if (val.newPassword.length < 8) {
      ctx.addIssue({
        code: "TOO_SHORT",
        message: "New password must be at least 8 characters",
        path: ["newPassword"],
      } as any);
    }
    if (![...val.newPassword].some((char) => char >= "a" && char <= "z")) {
      ctx.addIssue({
        code: "MISSING_LOWERCASE",
        message: "New password must contain at least one lowercase letter",
        path: ["newPassword"],
      } as any);
    }
    if (![...val.newPassword].some((char) => char >= "A" && char <= "Z")) {
      ctx.addIssue({
        code: "MISSING_UPPERCASE",
        message: "New password must contain at least one uppercase letter",
        path: ["newPassword"],
      } as any);
    }
    if (![...val.newPassword].some((char) => char >= "0" && char <= "9")) {
      ctx.addIssue({
        code: "MISSING_NUMBER",
        message: "New password must contain at least one number",
        path: ["newPassword"],
      } as any);
    }
    if (
      ![...val.newPassword].some((char) =>
        "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?".includes(char),
      )
    ) {
      ctx.addIssue({
        message: "New password must contain at least one special character",
        code: "MISSING_SYMBOL",
        path: ["newPassword"],
      } as any);
    }
    if (typeof val.token !== "string" || val.token === "") {
      ctx.addIssue({
        message: "Token is required.",
        code: "invalid_type",
        path: ["token"],
      } as any);
    }
  });

export type ResetPasswordInfo = z.infer<typeof resetPasswordSchema>;
