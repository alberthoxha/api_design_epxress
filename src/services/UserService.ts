import prisma from "../prisma/client";
import {
  comparePasswords,
  createJWT,
  hashPassword,
} from "./../middlewares/auth";

class UserService {
  async createNewUser(userData) {
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: await hashPassword(userData.hashPassword),
      },
    });

    const token = createJWT(user);
    return { token };
  }

  async login(userData) {
    const user = await prisma.user.findUnique({
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

export const userService = new UserService();
