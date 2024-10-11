import { Router } from "express";
import expensesController from "../controllers/expensesController";

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
expensesRouter.get("/", expensesController.getExpenses);
expensesRouter.get("/:id", expensesController.getExpeseById); 
expensesRouter.post("/", expensesController.createExpense);     

export default expensesRouter;
