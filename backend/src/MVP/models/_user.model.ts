import prisma from "../db";
import bcrypt from "bcrypt";
import { UserRole } from "../../prisma/generated/prisma";

export async function createUser(
  email: string,
  password: string,
  role: UserRole
) {
  try {
    // Hash the password before storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user with Prisma instead of raw SQL
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        role,
        accountStatus: "PENDING_VERIFICATION",
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    // Find user by email with Prisma instead of raw SQL
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}
