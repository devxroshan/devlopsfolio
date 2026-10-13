import mongoose from "mongoose";
import z from "zod";

export const deleteSkillSchema = z.object({
  skill_id: z
    .string()
    .refine(
      (id) => mongoose.Types.ObjectId.isValid(id),
      "Skill ID must be valid.",
    ),
});
