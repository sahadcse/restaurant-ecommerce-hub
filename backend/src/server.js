import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port: number = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Restaurant E-Commerce Hub Backend (TypeScript)');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});