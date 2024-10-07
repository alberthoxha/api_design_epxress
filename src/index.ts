import { Router } from 'express';
import * as dotenv from "dotenv";
dotenv.config();

import app, { setupSwagger } from "./server";

setupSwagger(app);

app.listen(3001, () => {
  console.log("hello on http://localhost:3001");
});
