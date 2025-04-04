import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/user.model';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'; // Use .env in prod

// Register endpoint
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  if (!['customer', 'restaurant', 'admin'].includes(role)) {
    res.status(400).json({ error: 'Invalid role' });
    return;
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ error: 'Email already exists' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword, role);

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ user: { id: user.id, email: user.email, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ error: (err as Error) });
  }
});

// Login endpoint
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ user: { id: user.id, email: user.email, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;