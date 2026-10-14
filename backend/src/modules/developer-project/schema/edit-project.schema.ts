import mongoose from "mongoose";
import z from "zod";

export const editProjectSchema = z
  .object({
    id: z
      .string()
      .refine(
        (id) => mongoose.Types.ObjectId.isValid(id),
        "Invalid Project ID.",
      ),
    title: z.string().optional(),
    role: z.array(z.string()).min(1).optional(),
    description: z.string().optional(),
    tech_stack: z.array(z.string().min(1)).optional(),
    outcome_or_metrics: z.string().optional(),
    live: z.string().min(1).optional(),
    github: z.string().min(1).optional(),
  })
  .refine(
    ({ id, ...fields }) =>
      Object.values(fields).some((value) => value !== undefined),
    "At least one project field must be provided.",
  );
