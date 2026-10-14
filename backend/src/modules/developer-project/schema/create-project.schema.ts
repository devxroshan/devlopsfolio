import z from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1),
  role: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  tech_stack: z.array(z.string().min(1)).min(1),
  outcome_or_metrics: z.string().min(1),
  live: z.string().min(1),
  github: z.string().min(1),
});