import { UserRole } from "../../prisma/generated/prisma";

// Define JsonValue type locally since it's not exported from Prisma
type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

declare global {
  namespace Express {
    interface Request {
      user?: {
        [key: string]: any;
        id: string;
        role: UserRole;
      };
      session?: {
        id: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
        userId: string;
        refreshToken: string | null;
        ipAddress: string | null;
        deviceInfo: JsonValue;
        revokedAt: Date | null;
      };
    }
  }
}

export {};
