// import { Router, Request, Response } from "express";
// import authRouter from "./_auth.route";
// import restaurantRouter from "./restaurants.route";
// import menuRouter from "./menu.route";
// import orderRouter from "./orders.route";

// // Import user routes
// import userRouter from "../domains/user/user.routes";
// import { PrismaClient } from "../../prisma/generated/prisma";

// const prisma = new PrismaClient();
// const router = Router();

// // Root route
// router.get("/", (req: Request, res: Response) => {
//   res.send("Restaurant E-Commerce Hub Backend (TypeScript)");
// });

// // Database test route
// router.get("/db-test", async (req: Request, res: Response) => {
//   try {
//     await prisma.$connect();
//     res.json({ message: "Database connected" });
//   } catch (err) {
//     res.status(500).json({ error: (err as Error).message });
//   } finally {
//     await prisma.$disconnect();
//   }
// });

// // Register all routes
// router.use("/auth", authRouter);
// router.use("/restaurants", restaurantRouter);
// router.use("/menu", menuRouter);
// router.use("/orders", orderRouter);

// // User routes
// router.use("/users", userRouter);

// export default router;
