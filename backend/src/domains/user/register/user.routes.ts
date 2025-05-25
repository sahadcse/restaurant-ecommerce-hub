import { Router } from "express";
import * as userController from "./user.controller";
import {
  authenticate,
  authorizeRoles,
} from "../../../middleware/auth.middleware";
import { validateRequest } from "../../../middleware/validation.middleware";
import { userRegistrationSchema, emailSchema } from "../types/user.validation";
import { UserRole } from "../../../../prisma/generated/prisma";

const router = Router();

/**
 * Role-specific registration endpoints
 */
router.post(
  "/register/customer",
  validateRequest(userRegistrationSchema),
  userController.registerCustomer
);

/**
 * Restaurant-specific registration endpoints
 * Role-specific registration endpoints
 * These endpoints are for restaurant owners and staff
 * This section handles the registration of restaurant personnel
 */

/**
 * Additional information about restaurant registration
 * This section can include validation rules and requirements
 */
router.post(
  "/register/restaurant-owner",
  validateRequest(userRegistrationSchema),
  userController.registerRestaurantOwner
);
router.post(
  "/register/restaurant-staff",
  validateRequest(userRegistrationSchema),
  userController.registerRestaurantStaff
);

/**
 * Additional information about restaurant registration
 * This section can include validation rules and requirements
 */
// Admin registration - protected route for SUPER_ADMIN only
router.post(
  "/register/admin",
  authenticate,
  authorizeRoles(UserRole.SUPER_ADMIN),
  validateRequest(userRegistrationSchema),
  userController.registerAdmin
);

/**
 * Initial setup endpoint (create first SUPER_ADMIN)
 * This endpoint can only be called once when no SUPER_ADMIN exists in the system
 * It's protected by a setup key defined in environment variables
 */
router.post(
  "/setup/super-admin",
  validateRequest(userRegistrationSchema),
  userController.createFirstSuperAdmin
);

/**
 * Legacy registration endpoint (for backward compatibility)
 * @deprecated Use role-specific endpoints instead
 */
router.post(
  "/register",
  validateRequest(userRegistrationSchema),
  userController.registerUser
);

/**
 * @route GET /users/verify-email/:token
 * @desc Verify user email with token
 * @access Public
 */
router.get("/verify-email/:token", userController.verifyEmail);

/**
 * @route POST /users/resend-verification
 * @desc Resend verification email
 * @access Public
 */
router.post(
  "/resend-verification",
  validateRequest(emailSchema),
  userController.resendVerificationEmail
);

export default router;
