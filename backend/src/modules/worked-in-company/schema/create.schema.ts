import z from "zod";

export const createWorkedInCompanySchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  start_year: z.number().min(1, "Start year is required"),
  end_year: z.number().optional(),
});

export type CreateWorkedInCompanySchema = z.infer<
  typeof createWorkedInCompanySchema
>;
