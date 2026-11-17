import z from "zod";

export const deleteLinkSchema = z.object({
  link: z.url("Social link should be valid."),
});

export type DeleteLinkSchema = z.infer<typeof deleteLinkSchema>;
