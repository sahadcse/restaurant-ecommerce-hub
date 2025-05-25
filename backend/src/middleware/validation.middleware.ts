import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import AppError from "../utils/AppError";

/**
 * Middleware for validating request data using Zod schemas
 */
export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const zodError = error as any;
      const formattedErrors = zodError.errors
        ? zodError.errors.map((e: any) => ({
            path: e.path.join("."),
            message: e.message,
          }))
        : [{ message: "Invalid request data" }];

      next(new AppError("Validation error", 400, { errors: formattedErrors }));
    }
  };
};
