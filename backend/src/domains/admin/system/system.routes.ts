import { Router } from "express";
import * as systemController from "./system.controller";
import {
  authenticate,
  authorizeRoles,
} from "../../../middleware/auth.middleware";
import { UserRole } from "../../../../prisma/generated/prisma";

const router = Router();

/**
 * @route GET /admin/system/test-email
 * @desc Test email configuration
 * @access Admin only
 */
router.get(
  "/test-email",
  authenticate,
  authorizeRoles(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  systemController.testEmailSetup
);

export default router;
