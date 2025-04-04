import express, { Request, Response, RequestHandler } from "express";
import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../models/restaurant";
import { authenticate, restrictTo } from "../middleware/auth";

const router = express.Router();

// Create restaurant (restaurant role only)
router.post(
  "/",
  authenticate,
  restrictTo("restaurant"),
  async (req: Request, res: Response): Promise<void> => {
    const { name, location, logo_url } = req.body;
    const owner_id = req.user!.id;

    if (!name || !location) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    try {
      const restaurant = await createRestaurant(
        name,
        location,
        owner_id,
        logo_url
      );
      res.status(201).json(restaurant);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

// Get all approved restaurants (public)
router.get("/", async (req: Request, res: Response) => {
  try {
    const restaurants = await getRestaurants();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get restaurant by ID (public)
router.get("/:id", (async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const restaurant = await getRestaurantById(id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}) as RequestHandler);

// Update restaurant (owner only)
router.put(
  "/:id",
  authenticate,
  restrictTo("restaurant"),
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { name, location, logo_url } = req.body;

    if (!name || !location) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    try {
      const restaurant = await getRestaurantById(id);
      if (!restaurant || restaurant.owner_id !== req.user!.id) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }

      const updated = await updateRestaurant(id, name, location, logo_url);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

// Delete restaurant (owner or admin only)
router.delete(
  "/:id",
  authenticate,
  restrictTo("restaurant", "admin"),
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
      const restaurant = await getRestaurantById(id);
      if (!restaurant) {
        res.status(404).json({ error: "Restaurant not found" });
        return;
      }
      if (req.user!.role !== "admin" && restaurant.owner_id !== req.user!.id) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }

      await deleteRestaurant(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

export default router;
