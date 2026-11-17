import z from "zod";

export const editLinkSchema = z.object({
  prev_link: z.url("Invalid previous link format."),
  new_link: z.url("Invalid new link format."),
});

export type EditLinkSchema = z.infer<typeof editLinkSchema>;
