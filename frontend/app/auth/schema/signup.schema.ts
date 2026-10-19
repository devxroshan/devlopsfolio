import z from "zod";

import { developerProfileSchema } from "./developer-profile.schema";

const baseSignUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  company: z.string("Must be string"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/(?=.*[a-z])/, "Password must contain a lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain a number")
    .regex(/(?=.*[^A-Za-z0-9])/, "Password must contain a special character"),
});

export const signUpSchema = z.discriminatedUnion("is_client", [
  baseSignUpSchema.extend({
    is_client: z.literal(true),
  }),
  baseSignUpSchema
    .extend({
      is_client: z.literal(false),
    })
    .extend(developerProfileSchema.shape),
]);

export type SignUpInfo = z.infer<typeof signUpSchema>;
