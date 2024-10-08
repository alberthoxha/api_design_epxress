import cors from "cors";
import express, { Express, response } from 'express';
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import { protect } from "./middlewares/auth";
import userRouter from "./routes/user";
import { swaggerSpec } from './swagger';

import router from "./router";
import prisma from "./prisma/client";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

app.get("/", async (req, res) => {
  const user = await prisma.user.findMany()
  res.json(user)
});

app.use("/api", protect, router);
app.use("/user", userRouter);

export default app;
