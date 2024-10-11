import { Request, Response } from "express";
import expensesService from "../services/ExpensesService";
import prisma from "../prisma/client";
import { CreateExpanseSchema } from "../zodSchema";

class ExpensesController {
  async getExpenses(req: Request, res: Response) {
    try {
      const { expenses, total } = await expensesService.getServices(req);
      res.json({ data: expenses, total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getExpeseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const foundExpense = await expensesService.getExpenseById(id);
      res.status(200).json(foundExpense);
    } catch (error) {
      res.status(500).send({ message: error?.message });
    }
  }

  async createExpense(req: Request, res: Response) {
    const expense = CreateExpanseSchema.strict().safeParse(req.body);

    if (!expense.success) res.status(400).json(expense.error);
    
    try {
      const newExpense = await expensesService.createExpense(expense.data, req);
      res.status(201).json(newExpense);
    } catch (error) {
      res.status(500).send({ message: error?.message });
    }
  }

  async updateExpense(req: Request, res: Response) {
    // Functionality to update an expense will be implemented here
  }

  async deleteExpense(req: Request, res: Response) {
    // Functionality to delete an expense will be implemented here
  }
}

export default new ExpensesController();
