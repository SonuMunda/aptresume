import { z } from "zod";

export const profileSchema = z.object({
  network: z.string().min(2, "Network is required"),
  username: z.string().min(2, "Username is required"),
  url: z.string().url("Enter a valid URL"),
});

export type ProfileForm = z.infer<typeof profileSchema>;
