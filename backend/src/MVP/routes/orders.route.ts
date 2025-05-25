import express, { Request, Response } from 'express';
import {
  createOrder,
  getOrdersByUser,
  getOrdersByRestaurant,
  updateOrderStatus,
} from '../models/order.model';
import { authenticate, restrictTo } from '../middleware/auth';
import { getRestaurantById } from '../models/restaurant.model';

const router = express.Router();

// Create order (customer only)
router.post('/', authenticate, restrictTo('customer'), async (req: Request, res: Response): Promise<void> => {
  const { restaurant_id, items, total } = req.body;
  const user_id = req.user!.id;

  if (!restaurant_id || !items || !total || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: 'Missing or invalid required fields' });
    return;
  }

  try {
    const restaurant = await getRestaurantById(restaurant_id);
    if (!restaurant) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }

    if (!restaurant.approved) {
      res.status(403).json({ error: 'Restaurant is not approved' });
      return;
    }

    const order = await createOrder(user_id, restaurant_id, items, total);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get user's orders (customer only)
router.get('/my-orders', authenticate, restrictTo('customer'), async (req: Request, res: Response) => {
  const user_id = req.user!.id;

  try {
    const orders = await getOrdersByUser(user_id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get restaurant's orders (restaurant only)
router.get(
  '/restaurant/:restaurant_id',
  authenticate,
  restrictTo('restaurant'),
  async (req: Request, res: Response): Promise<void> => {
    const restaurant_id = parseInt(req.params.restaurant_id);

    try {
      const restaurant = await getRestaurantById(restaurant_id);
      if (!restaurant || restaurant.owner_id !== req.user!.id) {
        res.status(403).json({ error: 'Unauthorized' });
        return;
      }

      const orders = await getOrdersByRestaurant(restaurant_id);
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

// Update order status (restaurant only)
router.put(
  '/:id/status',
  authenticate,
  restrictTo('restaurant'),
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    if (!['pending', 'preparing', 'shipped', 'delivered'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
        return;
    }

    try {
      const order = await updateOrderStatus(id, status);
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }

      const restaurant = await getRestaurantById(order.restaurant_id);
      if (!restaurant || restaurant.owner_id !== req.user!.id) {
        res.status(403).json({ error: 'Unauthorized' });
        return;
      }

      res.json(order);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

export default router;