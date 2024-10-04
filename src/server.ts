import cors from "cors";
import express from "express";
import morgan from "morgan";
import {protect} from "./middlewares/auth";
import router from "./router";
import userRouter from "./routes/user.router";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", protect, router);
app.use("/user", userRouter);

export default app;
