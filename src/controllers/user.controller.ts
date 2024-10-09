import { Request, Response } from "express";
import { userService } from "../services/UserService";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { token } = await userService.createNewUser(req.body);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token } = await userService.login(req.body);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
