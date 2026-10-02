import { z } from "zod";

export const verifyEmailSchema = z.object({
  userId: z.string(),
  otp: z.string().regex(/^\d{4,6}$/, "OTP must be 6 digits"),
});