import z from "zod";
import mongoose from "mongoose";

import { EProficiencyLevel } from "./add-skill.schema.js";

export const editSkillSchema = z
  .object({
    id: z
      .string()
      .refine(
        (id) => mongoose.Types.ObjectId.isValid(id),
        "Invalid skill id.",
      ),

    name: z.string().min(1, "Skill name is required.").optional(),

    experience_year: z
      .number()
      .min(1, "It must be at least 1 year of experience.")
      .optional(),

    proficiency_level: EProficiencyLevel.optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.experience_year !== undefined ||
      data.proficiency_level !== undefined,
    {
      message: "At least one field besides id must be provided.",
    },
  );
