import cors from "cors";
import express  from "express";
import { Express } from 'express';
import morgan from "morgan";
import { protect } from "./middlewares/auth";
import userRouter from "./routes/user";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import router from "./router";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger configuration
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'API documentation for my Express app',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Update with your server URL
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to your API docs (update as needed)
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the server homepage</h1>");
});

app.use("/api", protect, router);
app.use("api/user", userRouter);

export default app;
