import { PrismaClient } from "@prisma/client";
import {
  comparePasswords,
  createJWT,
  hashPassword,
} from "./../middlewares/auth";
import { randomUUID } from "crypto";
import { z } from "zod";
import { CreateUserSchema, LoginUserSchema } from "../zodSchema";

class UserService {
  private prisma = new PrismaClient();

  async createNewUser(userData: z.infer<typeof CreateUserSchema>) {
    const user = await this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: await hashPassword(userData.password),  // Corrected property name
      },
    });
  
    const token = createJWT(user);
    return { token };
  }

  async login(userData: z.infer<typeof LoginUserSchema>) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await comparePasswords(userData.password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    const token = createJWT(user);
    return { token };
  }
}

export default new UserService();
