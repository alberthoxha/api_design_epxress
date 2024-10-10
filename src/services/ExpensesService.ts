import prisma from "../prisma/client";

class ExpensesService {
  async getServices(data) {
    const { user } = data;

    const expenses = await prisma.expense.findMany({
      where: {
        userId: user.id,
      },
      include: {
        category: true,
        paymentMethod: true,
      },
    });

    const expensesCount = await prisma.expense.count({
      where: {
        userId: user.id,
      },
    });

    const formattedExpenses = expenses.map((expense) => ({
      ...expense,
      category: expense.category?.name,
      paymentMethod: expense.paymentMethod?.name,
    }));

    return { expenses: formattedExpenses, total: expensesCount };
  }
}

export const expesesService = new ExpensesService();
