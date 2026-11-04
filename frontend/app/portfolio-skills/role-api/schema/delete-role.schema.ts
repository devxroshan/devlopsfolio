import z from "zod";

export const deleteRoleSchema = z.object({
  worked_in_company_id: z.string().min(1, "Worked In Company ID is required"),
});

export type DeleteRoleSchema = z.infer<typeof deleteRoleSchema>;
