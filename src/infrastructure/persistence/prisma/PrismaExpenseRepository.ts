import { PrismaClient } from '@prisma/client'
import { Expense, ExpenseWithCategory, PaymentType } from '../../../domain/entities/Expense'
import { IExpenseRepository } from '../../../domain/ports/ExpenseRepository'

export class PrismaExpenseRepository implements IExpenseRepository {
  constructor(private prisma: PrismaClient) {}

  async findAllByUserId(userId: string): Promise<{ expenses: ExpenseWithCategory[]; total: number }> {
    const [expenses, total] = await Promise.all([
      this.prisma.expense.findMany({
        where: { userId },
        include: { category: true },
      }),
      this.prisma.expense.count({ where: { userId } }),
    ])

    return { expenses: expenses as unknown as ExpenseWithCategory[], total }
  }

  async findById(id: string): Promise<ExpenseWithCategory | null> {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: { category: true },
    })
    return expense as unknown as ExpenseWithCategory | null
  }

  async create(data: {
    amount: number
    description: string
    userId: string
    categoryId: string | null
    paymentMethod: PaymentType
  }): Promise<Expense> {
    return this.prisma.expense.create({ data }) as unknown as Expense
  }

  async update(
    id: string,
    data: {
      amount: number
      description: string
      categoryId: string | null
      paymentMethod: PaymentType
    }
  ): Promise<Expense> {
    return this.prisma.expense.update({ where: { id }, data }) as unknown as Expense
  }

  async delete(id: string): Promise<void> {
    await this.prisma.expense.delete({ where: { id } })
  }
}
