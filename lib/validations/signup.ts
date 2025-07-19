import { z } from "zod";

// Validation schema for sign-up form using Zod
export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/\d/, "Must contain a number")
    .regex(/[\W_]/, "Must contain a special character"),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;