import {Router} from 'express';
import {createNewUser, signin} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/signup", createNewUser);
userRouter.post("/signin", signin);

export default userRouter;