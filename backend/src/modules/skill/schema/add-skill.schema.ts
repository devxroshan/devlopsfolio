import z from "zod";

export const EProficiencyLevel = z.enum(["Advance", "Intermediate", "Beginner"]);

export const addSkillSchema = z.object({
  name: z.string("Must be string.").min(1, "Skill name is required."),
  experience_year: z
    .number()
    .min(1, "It must be 1 years of experience at-least."),
  proficiency_level: EProficiencyLevel,
});
