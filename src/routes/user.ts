import { Router } from "express";
import { createNewUser, login } from "../controllers/user.controller"; // Import your getUsers controller

const userRouter = Router();

userRouter.post("/signup", createNewUser);
userRouter.post("/login", login);

export default userRouter;
