import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const comparePasswords = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    {
      id: user?.id,
      email: user?.email,
    },
    process.env.JWT_SECRET!
  );
  return token;
};


export const authenticate = (req: any, res: any, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({ message: "not authorized" });
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    return res.status(401).json({ message: "not valid token" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = user; // Attach the user to the request
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "not valid token" });
  }
};
