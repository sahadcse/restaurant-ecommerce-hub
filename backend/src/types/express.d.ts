import { UserRole } from "../../prisma/generated/prisma";
import { Session } from "../../prisma/generated/prisma";

// Use module augmentation to extend Express types
declare global {
  namespace Express {
    // Extend Request interface
    interface Request {
      // The authenticated user information
      user?: {
        id: string;
        role: string;
      };

      // The current session information
      session?: any;
    }
  }
}

// This export is required for the declarations to be recognized as a module
export {};
