import { Router } from "express";
import { createNewUser, login } from "../controllers/user.controller"; // Import your getUsers controller

const userRouter = Router();

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The password for the user account
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email format"
 */

userRouter.post("/signup", createNewUser);
userRouter.post("/signin", login);

export default userRouter;
