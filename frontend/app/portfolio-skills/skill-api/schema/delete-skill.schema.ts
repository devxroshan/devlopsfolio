import z from "zod";

export const deleteSkillSchema = z.object({
  skill_id: z.string().min(1, "Skill ID is required."),
});

export type DeleteSkillSchema = z.infer<typeof deleteSkillSchema>;
