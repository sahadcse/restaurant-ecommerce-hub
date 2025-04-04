import pool from '../db';

interface Restaurant {
  id: number;
  name: string;
  location: string;
  logo_url?: string;
  owner_id: number;
  approved: boolean;
}

export const createRestaurant = async (
  name: string,
  location: string,
  owner_id: number,
  logo_url?: string
): Promise<Restaurant> => {
  const query = `
    INSERT INTO restaurants (name, location, owner_id, logo_url)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, location, logo_url, owner_id, approved
  `;
  const { rows } = await pool.query(query, [name, location, owner_id, logo_url]);
  return rows[0];
};

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const query = `
    SELECT id, name, location, logo_url, owner_id, approved
    FROM restaurants
    WHERE approved = TRUE
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const getRestaurantById = async (id: number): Promise<Restaurant | null> => {
  const query = `
    SELECT id, name, location, logo_url, owner_id, approved
    FROM restaurants
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};

export const updateRestaurant = async (
  id: number,
  name: string,
  location: string,
  logo_url?: string
): Promise<Restaurant | null> => {
  const query = `
    UPDATE restaurants
    SET name = $2, location = $3, logo_url = $4
    WHERE id = $1
    RETURNING id, name, location, logo_url, owner_id, approved
  `;
  const { rows } = await pool.query(query, [id, name, location, logo_url]);
  return rows[0] || null;
};

export const deleteRestaurant = async (id: number): Promise<void> => {
  const query = `DELETE FROM restaurants WHERE id = $1`;
  await pool.query(query, [id]);
};