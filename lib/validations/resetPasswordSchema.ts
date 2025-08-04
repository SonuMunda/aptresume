import z from "zod";

export const resetPasswordSchema = z
  .object({
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
    confirm: z.string(),
  })
  .superRefine(({ password, confirm }, ctx) => {
    if (password !== confirm) {
      ctx.addIssue({
        path: ["confirm"],
        message: "Password and confirm password must match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
