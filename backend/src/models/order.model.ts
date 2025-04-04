import pool from '../db';

interface Order {
  id: number;
  user_id: number;
  restaurant_id: number;
  status: 'pending' | 'preparing' | 'shipped' | 'delivered';
  total: number;
  created_at: Date;
}

interface OrderItem {
  menu_item_id: number;
  quantity: number;
}

export const createOrder = async (
  user_id: number,
  restaurant_id: number,
  items: OrderItem[],
  total: number
): Promise<Order> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const orderQuery = `
      INSERT INTO orders (user_id, restaurant_id, status, total)
      VALUES ($1, $2, 'pending', $3)
      RETURNING id, user_id, restaurant_id, status, total, created_at
    `;
    const orderResult = await client.query(orderQuery, [user_id, restaurant_id, total]);
    const order = orderResult.rows[0];

    // verify the menu items exist in the restaurant's menu
    const menuItemIds = items.map(item => item.menu_item_id);
    const menuItemQuery = `
        SELECT id FROM menu_items WHERE restaurant_id = $1 AND id = ANY($2::int[])
        `;
    const menuItemResult = await client.query(menuItemQuery, [restaurant_id, menuItemIds]);
    const existingMenuItemIds = menuItemResult.rows.map(row => row.id);
    const missingMenuItemIds = menuItemIds.filter(id => !existingMenuItemIds.includes(id));
    if (missingMenuItemIds.length > 0) {
      throw new Error(`Menu items with IDs ${missingMenuItemIds.join(', ')} do not exist in the restaurant's menu.`);
    }

    const itemQuery = `
      INSERT INTO order_items (order_id, menu_item_id, quantity)
      VALUES ($1, $2, $3)
    `;
    for (const item of items) {
      await client.query(itemQuery, [order.id, item.menu_item_id, item.quantity]);
    }

    await client.query('COMMIT');
    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const getOrdersByUser = async (user_id: number): Promise<Order[]> => {
  const query = `
    SELECT id, user_id, restaurant_id, status, total, created_at
    FROM orders
    WHERE user_id = $1
  `;
  const { rows } = await pool.query(query, [user_id]);
  return rows;
};

export const getOrdersByRestaurant = async (restaurant_id: number): Promise<Order[]> => {
  const query = `
    SELECT id, user_id, restaurant_id, status, total, created_at
    FROM orders
    WHERE restaurant_id = $1
  `;
  const { rows } = await pool.query(query, [restaurant_id]);
  return rows;
};

export const updateOrderStatus = async (
  id: number,
  status: 'pending' | 'preparing' | 'shipped' | 'delivered'
): Promise<Order | null> => {
  const query = `
    UPDATE orders
    SET status = $2
    WHERE id = $1
    RETURNING id, user_id, restaurant_id, status, total, created_at
  `;
  const { rows } = await pool.query(query, [id, status]);
  return rows[0] || null;
};