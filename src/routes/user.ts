import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.post("/signup", userController.createNewUser);
userRouter.post("/login", userController.login);

export default userRouter;
