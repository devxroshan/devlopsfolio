import z from "zod";

export const addLinkSchema = z.object({
  link: z.url("Social link should be valid."),
});

export type AddLinkSchema = z.infer<typeof addLinkSchema>;
