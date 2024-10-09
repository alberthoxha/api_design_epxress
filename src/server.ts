import cors from "cors";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { protect } from "./middlewares/auth";
import userRouter from "./routes/user";
import { swaggerSpec } from "./swagger";

import { type User } from "@prisma/client";
import prisma from "./prisma/client";
import router from "./router";

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
app.use("/api", protect, router);

app.use("/*", (_, res) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
