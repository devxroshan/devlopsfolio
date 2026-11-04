import z from "zod";

export const addProjectSchema = z.object({
  title: z.string().min(1, "Project title required."),
  role: z.array(z.string()).min(1, "Role required."),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(500, "Maximum 500 characters of description is allowed."),
  tech_stack: z.array(z.string()).min(1, "Tech stack is required."),
  outcome_or_metrics: z.string().min(1, "Outcome and metrics are required."),
  live: z.url("Invalid live URL."),
  github: z.url("Invalid GitHub URL.").refine((value) => {
    const url = new URL(value);
    return (
      url.hostname === "github.com" &&
      url.pathname.split("/").filter(Boolean).length >= 2
    );
  }, "Invalid GitHub URL."),
});

export type AddProjectSchema = z.infer<typeof addProjectSchema>;
