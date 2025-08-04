import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, { message: "Enter a valid name" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(36, { message: "Name must not exceed 36 characters" }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: "Email is required" })
    .email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .superRefine((val, ctx) => {
      if (!/[A-Z]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must contain an uppercase letter",
        });
      }
      if (!/[a-z]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must contain a lowercase letter",
        });
      }
      if (!/\d/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must contain a number",
        });
      }
      if (!/[\W_]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must contain a special character",
        });
      }
    }),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
