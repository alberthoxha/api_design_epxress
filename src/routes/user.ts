import { Router } from "express";
import { createNewUser, login } from "../controllers/user.controller"; // Import your getUsers controller

const userRouter = Router();

userRouter.post("/user/signup", createNewUser);
userRouter.post("/user/login", login);

export default userRouter;
