// lib/middleware/validate.ts
import { ZodSchema } from "zod";
import { NextApiRequest, NextApiResponse } from "next";

export function validateBody<T>(
  schema: ZodSchema<T>,
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        });
      }
      req.body = result.data;
      return handler(req, res);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
