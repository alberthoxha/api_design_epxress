import { PrismaClient } from '@prisma/client';
import { Router } from "express";
import { createNewUser, login } from "../controllers/user.controller"; // Import your getUsers controller
import { getExpenses } from "../controllers/expensesController";

const expensesRouter = Router();

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Returns all expense
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: the list of expense
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/PrismaClient'
 */
expensesRouter.get("/expenses", getExpenses);          // Get all categories for the current user
// expensesRoute.post("/categories", createCategory);        // Create a new category
// expensesRoute.put("/categories/:id", updateCategory);     // Update a category by ID
// expensesRoute.delete("/categories/:id", deleteCategory);

export default expensesRouter;
      