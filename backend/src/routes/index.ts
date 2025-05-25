import { Router, Request, Response } from "express";

// Import user routes
import userRouter from "../domains/user/register/user.routes";
import authRouter from "../domains/user/auth/auth.routes";
import systemRouter from "../domains/admin/system/system.routes";
import restaurantRouter from "../domains/restaurant/routes/restaurant.routes";
import { mediaRouter } from "../domains/media";
import { PrismaClient } from "../../prisma/generated/prisma";

const prisma = new PrismaClient();
const router = Router();

// Root route
router.get("/", (req: Request, res: Response) => {
  res.send("Restaurant E-Commerce Hub Backend (TypeScript)");
});

// Database test route
router.get("/db-test", async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    res.json({ message: "Database connected" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  } finally {
    await prisma.$disconnect();
  }
});

// User routes
router.use("/users", userRouter);

// Auth routes
router.use("/auth", authRouter);

// Admin system routes
router.use("/admin/system", systemRouter);

// Restaurant management routes
router.use("/restaurants", restaurantRouter);

// Media routes
router.use("/media", mediaRouter);

export default router;
