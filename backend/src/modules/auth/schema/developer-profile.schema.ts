import z from "zod";

const EAvailability = z.enum(["full time", "part time", "not available"]);

export const developerProfileSchema = z.object({
  hourly_rate_rupees: z.number(),
  availability: EAvailability,
  experience_years: z.number(),
  location: z.string(),
  title: z.string(),
  discipline: z.string(),
  social_links: z.array(z.string()),
  bio: z
    .string()
    .min(1, "Bio is required")
    .max(700, "Bio cannot exceeds 700 characters."),
  core_competencies: z
    .array(
      z
        .string()
        .min(1)
        .max(100, "Each competency cannot exceeds 100 characters."),
    )
    .min(1, "Core competency is required."),
});
