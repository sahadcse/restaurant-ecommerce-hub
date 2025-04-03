import pool from '../db';

interface User {
  id: number;
  email: string;
  password: string;
  role: 'customer' | 'restaurant' | 'admin';
  created_at: Date;
}

export const createUser = async (
  email: string,
  password: string,
  role: 'customer' | 'restaurant' | 'admin'
): Promise<User> => {
  const query = `
    INSERT INTO users (email, password, role)
    VALUES ($1, $2, $3)
    RETURNING id, email, role, created_at
  `;
  const { rows } = await pool.query(query, [email, password, role]);
  return rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const query = `
    SELECT id, email, password, role, created_at
    FROM users
    WHERE email = $1
  `;
  const { rows } = await pool.query(query, [email]);
  return rows[0] || null;
};