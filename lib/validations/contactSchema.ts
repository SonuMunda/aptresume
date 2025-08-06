import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, { message: "Enter a valid name" })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(36, { message: "Name must not exceed 36 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;
