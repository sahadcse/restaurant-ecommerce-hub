import { Request, Response, NextFunction } from "express";
import { testEmailConnection } from "../../../utils/email.utils";
import { UserRole } from "../../../../prisma/generated/prisma";
import AppError from "../../../utils/AppError";

/**
 * Test email configuration and connectivity
 * Restricted to admins and super admins
 */
export const testEmailSetup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure only admins can access this endpoint
    if (
      !req.user ||
      (req.user.role !== UserRole.ADMIN &&
        req.user.role !== UserRole.SUPER_ADMIN)
    ) {
      throw new AppError("Forbidden: Admin access required", 403);
    }

    const result = await testEmailConnection();

    if (result.success) {
      res.status(200).json({
        status: "success",
        message: result.message,
      });
    } else {
      res.status(400).json({
        status: "error",
        message: result.message,
      });
    }
  } catch (error) {
    next(error);
  }
};
