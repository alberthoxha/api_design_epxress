import cors from "cors";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { authenticate } from "./middlewares/auth";
import userRouter from "./routes/user";
import { swaggerSpec } from "./swagger/swagger";

import prisma from "./prisma/client";
import expensesRouter from "./routes/expenses";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

app.get("/", async (_: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/user", userRouter);
app.use("/api/expenses", authenticate, expensesRouter);

export default app;
