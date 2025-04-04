import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import pool from './db';
import authRouter from './routes/auth';
import restaurantRouter from './routes/restaurants';

dotenv.config();
const app = express();
const port: number = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use('/auth', authRouter);
app.use('/restaurants', restaurantRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Restaurant E-Commerce Hub Backend (TypeScript)');
});

app.get('/db-test', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Database connected', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});