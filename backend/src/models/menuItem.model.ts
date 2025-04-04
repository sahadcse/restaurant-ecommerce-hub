import pool from '../db';

interface MenuItem {
  id: number;
  restaurant_id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
}

export const createMenuItem = async (
  restaurant_id: number,
  name: string,
  price: number,
  description?: string,
  image_url?: string
): Promise<MenuItem> => {
  const query = `
    INSERT INTO menu_items (restaurant_id, name, price, description, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, restaurant_id, name, price, description, image_url
  `;
  const { rows } = await pool.query(query, [restaurant_id, name, price, description, image_url]);
  return rows[0];
};

export const getMenuItemsByRestaurant = async (restaurant_id: number): Promise<MenuItem[]> => {
  const query = `
    SELECT id, restaurant_id, name, price, description, image_url
    FROM menu_items
    WHERE restaurant_id = $1
  `;
  const { rows } = await pool.query(query, [restaurant_id]);
  return rows;
};

export const getMenuItemById = async (id: number): Promise<MenuItem | null> => {
  const query = `
    SELECT id, restaurant_id, name, price, description, image_url
    FROM menu_items
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};

export const updateMenuItem = async (
  id: number,
  name: string,
  price: number,
  description?: string,
  image_url?: string
): Promise<MenuItem | null> => {
  const query = `
    UPDATE menu_items
    SET name = $2, price = $3, description = $4, image_url = $5
    WHERE id = $1
    RETURNING id, restaurant_id, name, price, description, image_url
  `;
  const { rows } = await pool.query(query, [id, name, price, description, image_url]);
  return rows[0] || null;
};

export const deleteMenuItem = async (id: number): Promise<void> => {
  const query = `DELETE FROM menu_items WHERE id = $1`;
  await pool.query(query, [id]);
};