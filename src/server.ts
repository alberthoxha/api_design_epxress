import cors from "cors";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { authenticate } from "./middlewares/auth";
import userRouter from "./routes/user";
import { swaggerSpec } from "./swagger/swagger";

import prisma from "./prisma/client";
import router from "./router";
import expensesRouter from "./routes/expenses";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
app.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
 
app.use("/api", userRouter);
app.use("/api",authenticate, expensesRouter);
app.use("/api", authenticate, router);


export default app;
