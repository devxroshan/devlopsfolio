import mongoose from "mongoose";
import z from "zod";

export const deleteProjectSchema = z.object({
  project_id: z
    .string()
    .refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid Project ID."),
});
