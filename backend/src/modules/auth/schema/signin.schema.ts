import { z } from "zod";

export const signInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().nonempty({ message: "Password must not be blank" }),
});