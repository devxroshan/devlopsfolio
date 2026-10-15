import z from "zod";

const EAvailability = z.enum(["full time", "part time", "not available"]);

export const developerProfileSchema = z.object({
  hourly_rate_rupees: z.number(),
  availability: EAvailability,
  experience_years: z.number(),
  location: z.string(),
  time_zone: z.string(),
  title: z.string(),
  discipline: z.string(),
});
