import { Request, Response } from "express";
import { expesesService } from "../services/ExpensesService";

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const { expenses, total } = await expesesService.getServices(req);
    res.json({ data: expenses, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
