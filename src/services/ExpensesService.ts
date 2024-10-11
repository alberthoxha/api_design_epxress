import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import prisma from "../prisma/client";
import { CreateExpanseSchema } from "../zodSchema";

class ExpensesService {
  private prisma = new PrismaClient();

  async getServices(data: any) {
    try {
      const { user } = data;

      const expenses = await this.prisma.expense.findMany({
        where: { userId: user.id },
        include: { category: true },
      });

      const total = await prisma.expense.count({
        where: { userId: user.id },
      });

      const formattedExpenses = expenses.map((expense) => ({
        ...expense,
        category: expense.category?.name,
        paymentMethod: expense.paymentMethod,
      }));

      return { expenses: formattedExpenses, total };
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  async getExpenseById(id: string) {
    try {
      const foundExpense = await this.prisma.expense.findUnique({
        where: { id },
        include: { category: true },
      });

      const formattedExpense = {
        ...foundExpense,
        category: foundExpense?.category?.name,
        paymentMethod: foundExpense?.paymentMethod,
      };

      return formattedExpense;
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  async createExpense(
    expenseData: z.infer<typeof CreateExpanseSchema>,
    req: any
  ) {
    const { amount, description, category, paymentMethod } = expenseData;
    const userId = req.user.id;

    const categoryId = category
      ? (
          await this.prisma.category.upsert({
            where: { name: category },
            update: {},
            create: { name: category },
          })
        ).id
      : null;

    return await this.prisma.expense.create({
      data: {
        amount,
        description,
        userId,
        categoryId,
        paymentMethod,
      },
    });
  }

  async updateExpense() {
    // Functionality to update an expense will be implemented here
  }

  async deleteExpense() {
    // Functionality to delete an expense will be implemented here
  }

  private logError(error: unknown) {
    console.log("A prisma error orcurred");
    console.log(error);
  }
}

export default new ExpensesService();
