import { Request, Response } from "express";
import userService from "../services/UserService"; // Ensure to import your userService
import { CreateUserSchema, LoginUserSchema } from "../zodSchema";

class UserController {
  async createNewUser(req: Request, res: Response) {
    const newUser = CreateUserSchema.strict().safeParse(req.body);

    if (!newUser.success) res.status(400).json(newUser.error);

    try {
      const { token } = await userService.createNewUser(newUser.data);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const loginUser = LoginUserSchema.strict().safeParse(req.body)

    if(!loginUser.success) res.status(400).json(loginUser.error);

    try {
      const { token } = await userService.login(req.body);
      console.log(token);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new UserController();
