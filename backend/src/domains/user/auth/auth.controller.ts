import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import * as authRepo from "./auth.repository";
import { extractTokenFromHeader } from "../../../utils/jwt.utils";
import {
  LoginDto,
  RefreshTokenDto,
  PasswordResetRequestDto,
  PasswordResetConfirmDto,
  PasswordChangeDto,
} from "../types/auth.types";
import logger from "../../../utils/logger";
import AppError from "../../../utils/AppError";

/**
 * Handle user login
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginData: LoginDto = req.body;
    const ipAddress = req.ip;
    const userAgent = req.headers["user-agent"];

    const result = await authService.login(loginData, ipAddress, userAgent);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Handle token refresh
 */
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshData: RefreshTokenDto = req.body;
    const ipAddress = req.ip;
    const userAgent = req.headers["user-agent"];

    const tokens = await authService.refreshToken(
      refreshData,
      ipAddress,
      userAgent
    );

    res.status(200).json(tokens);
  } catch (error) {
    next(error);
  }
};

/**
 * Handle user logout
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    if (!token) {
      throw new AppError("No token provided", 400);
    }

    const allDevices = req.query.all === "true";

    await authService.logout(token, allDevices);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/**
 * Get current authenticated user information
 */
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User should be attached to request by the auth middleware
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    // Use repository instead of direct prisma call
    const user = await authRepo.findUserById(req.user.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

/**
 * Request password reset
 */
export const requestPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resetData: PasswordResetRequestDto = req.body;
    const ipAddress = req.ip;

    await authService.requestPasswordReset(resetData, ipAddress);

    // Always return success even if email doesn't exist (security best practice)
    res.status(200).json({
      message:
        "If your email exists in our system, you will receive password reset instructions.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Confirm password reset
 */
export const confirmPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const confirmData: PasswordResetConfirmDto = req.body;
    const ipAddress = req.ip;

    await authService.confirmPasswordReset(confirmData, ipAddress);

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * Change password (when logged in)
 */
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    const passwordData: PasswordChangeDto = req.body;
    const ipAddress = req.ip;

    await authService.changePassword(req.user.id, passwordData, ipAddress);

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};
