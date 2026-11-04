import z from "zod";
import mongoose from "mongoose";

export const deleteWorkedInCompanySchema = z.object({
  worked_in_company_id: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid company ID",
    }),
});

export type DeleteWorkedInCompanySchema = z.infer<
  typeof deleteWorkedInCompanySchema
>;
