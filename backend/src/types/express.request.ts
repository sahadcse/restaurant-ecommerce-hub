declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
      session?: any; // Replace 'any' with a proper type when available
    }
  }
}

export {};
