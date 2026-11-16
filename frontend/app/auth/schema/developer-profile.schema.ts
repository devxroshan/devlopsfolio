import z from "zod";

const EAvailability = z.enum(["full time", "part time", "not available"], {
  error: "Select a valid availability",
});

export const developerProfileSchema = z.object({
  availability: EAvailability,
  hourly_rate_rupees: z
    .number("Hourly rate must be a number")
    .int("Enter a whole number")
    .min(1, "Hourly rate is required"),
  experience_years: z
    .number()
    .int()
    .min(1, "Experience required")
    .max(60, "Enter a realistic value"),
  location: z.string().min(1, "Location is required"),
  title: z.string().min(1, "Title is required"),
  discipline: z.string().min(1, "Discipline is required"),
  bio: z
    .string()
    .min(1, "Bio is required.")
    .max(700, "Bio cannot exceeds 700 characters."),
  core_competencies: z
    .array(
      z
        .string()
        .min(1, "A competency cannot be empty.")
        .max(100, "A competency cannot exceeds 100 characters."),
    )
    .min(1, "At-least one competency is required."),
});

export type SignUpDeveloperInfo = z.infer<typeof developerProfileSchema>;
