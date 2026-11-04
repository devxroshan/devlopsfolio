import z from "zod";

export const createRoleSchema = z
  .object({
    company_name: z.string().min(1, { message: "Company name is required" }),
    role: z.string().min(1, { message: "Role is required" }),
    start_year: z
      .number()
      .int()
      .min(1900, { message: "Start year must be a valid year" })
      .refine((year) => year <= new Date().getFullYear(), {
        message: "Start year cannot be in the future",
      }),
    end_year: z.number().int(),
    description: z.string().optional(),
  })
  .refine((data) => data.end_year >= data.start_year || data.end_year === 0, {
    message: "End year must be greater than or equal to start year",
    path: ["end_year"],
  });

export type CreateRoleSchema = z.infer<typeof createRoleSchema>;
