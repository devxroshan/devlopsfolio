import z from "zod";
import { SkillProficiency } from "../../enum";

const EProficiency = z.enum(SkillProficiency, {
  error: "Select a valid proficiency.",
});

export const addSkillSchema = z.object({
  name: z.string().min(1, "Skill name is required."),
  experience_year: z
    .number()
    .min(1, "At-least one year of experience is required."),
  proficiency_level: EProficiency,
});

export type AddSkillInfo = z.infer<typeof addSkillSchema>;
