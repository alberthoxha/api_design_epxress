import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { CreateExpanseSchema } from '../zodSchema'
import { UpdateExpanseSchema } from './../zodSchema'

class ExpensesService {
  private prisma = new PrismaClient()

  async getAllExpenses(data: any) {
    try {
      const { user } = data

      const expenses = await this.prisma.expense.findMany({
        where: { userId: user.id },
        include: { category: true },
      })

      const total = await this.prisma.expense.count({
        where: { userId: user.id },
      })

      const formattedExpenses = expenses.map((expense) => ({
        ...expense,
        category: expense.category?.name,
        paymentMethod: expense.paymentMethod,
      }))

      return { expenses: formattedExpenses, total }
    } catch (error) {
      this.logError(error)
      throw error
    }
  }

  async getExpenseById(id: string, req: any) {
    try {
      const foundExpense = await this.prisma.expense.findUnique({
        where: { id },
        include: { category: true },
      })

      if (!foundExpense || foundExpense.userId !== req.user.id) throw new Error('Expense not found')

      const formattedExpense = {
        ...foundExpense,
        category: foundExpense?.category?.name,
        paymentMethod: foundExpense?.paymentMethod,
      }

      return formattedExpense
    } catch (error) {
      this.logError(error)
      throw error
    }
  }

  async createExpense(expenseData: z.infer<typeof CreateExpanseSchema>, req: any) {
    const { amount, description, category, paymentMethod } = expenseData
    const userId = req.user.id

    const categoryId = category
      ? (
          await this.prisma.category.upsert({
            where: { name: category },
            update: {},
            create: { name: category },
          })
        ).id
      : null

    return await this.prisma.expense.create({
      data: {
        amount,
        description,
        userId,
        categoryId,
        paymentMethod,
      },
    })
  }

  async updateExpenseById(
    expenseId: string,
    req: any,
    updateValue: z.infer<typeof UpdateExpanseSchema>
  ) {
    const { amount, category, description, paymentMethod } = updateValue
    const userId = req.user.id

    const existingExpense = await this.prisma.expense.findUnique({
      where: {
        id: expenseId,
      },
    })

    if (!existingExpense || existingExpense.userId !== userId) throw new Error('Expense not found')

    const categoryId = category
      ? (
          await this.prisma.category.upsert({
            where: { name: category },
            update: {},
            create: { name: category },
          })
        ).id
      : existingExpense.categoryId

    return await this.prisma.expense.update({
      where: { id: expenseId },
      data: { amount, description, categoryId, paymentMethod },
    })
  }

  async deleteExpenseById(expenseId: string, req: any) {
    const expenseToDelete = await this.prisma.expense.findUnique({
      where: {
        id: expenseId,
      },
    })

    if (!expenseToDelete || expenseToDelete.userId !== req.user.id)
      throw new Error('Expense not found')

    await this.prisma.expense.delete({
      where: {
        id: expenseId,
      },
    })
  }

  private logError(error: unknown) {
    console.log('A prisma error orcurred')
    console.log(error)
  }
}

export default new ExpensesService()
