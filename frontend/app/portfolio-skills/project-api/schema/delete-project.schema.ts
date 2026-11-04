import z from "zod";

export const deleteProjectSchema = z.object({
  project_id: z.string().min(1, "Project ID is required."),
});

export type DeleteProjectSchema = z.infer<typeof deleteProjectSchema>;
