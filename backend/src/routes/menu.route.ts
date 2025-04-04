import express, { Request, Response } from "express";
import {
  createMenuItem,
  getMenuItemsByRestaurant,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../models/menuItem.model";
import { authenticate, restrictTo } from "../middleware/auth";
import { getRestaurantById } from "../models/restaurant.model";

const router = express.Router();

// Create menu item (restaurant role only)
router.post(
  "/",
  authenticate,
  restrictTo("restaurant"),
  async (req: Request, res: Response): Promise<void> => {
    const { restaurant_id, name, price, description, image_url } = req.body;

    if (!restaurant_id || !name || !price) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    try {
      const restaurant = await getRestaurantById(restaurant_id);
      if (!restaurant || restaurant.owner_id !== req.user!.id) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }

      const menuItem = await createMenuItem(
        restaurant_id,
        name,
        price,
        description,
        image_url
      );
      res.status(201).json(menuItem);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

// Get menu items by restaurant (public)
router.get(
  "/:restaurant_id",
  async (req: Request, res: Response): Promise<void> => {
    const restaurant_id = parseInt(req.params.restaurant_id);

    console.log("restaurant_id", restaurant_id);

    try {
      const restaurant = await getRestaurantById(restaurant_id);
      if (!restaurant) {
        res.status(404).json({ error: "Restaurant not found " });
        return;
      }
      if (!restaurant.approved) {
        res.status(404).json({ error: "Restaurant not approved" });
        return;
      }

      const menuItems = await getMenuItemsByRestaurant(restaurant_id);
      res.json(menuItems);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

// Update menu item (restaurant role only)
router.put(
  "/:id",
  authenticate,
  restrictTo("restaurant"),
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { name, price, description, image_url } = req.body;

    if (!name || !price) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    try {
      const menuItem = await getMenuItemById(id);
      if (!menuItem) {
        res.status(404).json({ error: "Menu item not found" });
        return;
      }

      const restaurant = await getRestaurantById(menuItem.restaurant_id);
      if (!restaurant || restaurant.owner_id !== req.user!.id) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }

      const updated = await updateMenuItem(
        id,
        name,
        price,
        description,
        image_url
      );
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

// Delete menu item (restaurant role only)
router.delete(
  "/:id",
  authenticate,
  restrictTo("restaurant"),
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
      const menuItem = await getMenuItemById(id);
      if (!menuItem) {
        res.status(404).json({ error: "Menu item not found" });
        return;
      }

      const restaurant = await getRestaurantById(menuItem.restaurant_id);
      if (!restaurant || restaurant.owner_id !== req.user!.id) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }

      await deleteMenuItem(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

export default router;
