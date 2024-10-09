import { Router } from "express";
import { createNewUser, login } from "../controllers/user.controller"; // Import your getUsers controller

const categoryRouter = Router();

// categoryRouter.get("/categories", getCategories);          // Get all categories for the current user
// categoryRouter.post("/categories", createCategory);        // Create a new category
// categoryRouter.put("/categories/:id", updateCategory);     // Update a category by ID
// categoryRouter.delete("/categories/:id", deleteCategory);

export default categoryRouter;
