import z from "zod";

export const createWorkedInCompanySchema = z
  .object({
    company_name: z.string().min(1, "Company name is required"),
    role: z.string().min(1, "Role is required"),
    start_year: z
      .number()
      .min(1900, "Start year is required")
      .refine((year) => year <= new Date().getFullYear(), {
        message: "Start year cannot be in the future",
      }),
    end_year: z.number().int(),
    description: z.string().optional(),
  })
  .refine(
    ({ start_year, end_year }) => end_year === 0 || end_year >= start_year,
    {
      message: "End year must be greater than or equal to start year",
      path: ["end_year"],
    },
  );

export type CreateWorkedInCompanySchema = z.infer<
  typeof createWorkedInCompanySchema
>;
