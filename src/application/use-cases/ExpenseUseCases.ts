import { Expense, PaymentType } from '../../domain/entities/Expense'
import { DomainError } from '../../domain/errors/DomainError'
import { ICategoryRepository } from '../../domain/ports/CategoryRepository'
import { IExpenseRepository } from '../../domain/ports/ExpenseRepository'

interface ExpenseResponse extends Omit<Expense, 'categoryId'> {
  category: string | undefined
}

export class ExpenseUseCases {
  constructor(
    private expenseRepo: IExpenseRepository,
    private categoryRepo: ICategoryRepository
  ) {}

  async list(userId: string): Promise<{ expenses: ExpenseResponse[]; total: number }> {
    const { expenses, total } = await this.expenseRepo.findAllByUserId(userId)
    const formattedExpenses = expenses.map((expense) => ({
      ...expense,
      category: expense.category?.name,
      paymentMethod: expense.paymentMethod,
    }))
    return { expenses: formattedExpenses, total }
  }

  async getById(id: string, userId: string): Promise<ExpenseResponse> {
    const expense = await this.expenseRepo.findById(id)
    if (!expense || expense.userId !== userId)
      throw new DomainError(403, 'You do not have permission to access this expense')

    return {
      ...expense,
      category: expense.category?.name,
      paymentMethod: expense.paymentMethod,
    }
  }

  async create(
    userId: string,
    data: {
      amount: number
      description: string
      category: string
      paymentMethod: PaymentType
    }
  ): Promise<Expense> {
    const categoryId = data.category
      ? (await this.categoryRepo.upsertByName(data.category)).id
      : null

    return this.expenseRepo.create({
      amount: data.amount,
      description: data.description,
      userId,
      categoryId,
      paymentMethod: data.paymentMethod,
    })
  }

  async update(
    id: string,
    userId: string,
    data: {
      amount: number
      description: string
      category: string
      paymentMethod: PaymentType
    }
  ): Promise<Expense> {
    const existing = await this.expenseRepo.findById(id)
    if (!existing || existing.userId !== userId)
      throw new DomainError(403, 'You do not have permission to access this expense')

    const categoryId = data.category
      ? (await this.categoryRepo.upsertByName(data.category)).id
      : existing.categoryId

    return this.expenseRepo.update(id, {
      amount: data.amount,
      description: data.description,
      categoryId,
      paymentMethod: data.paymentMethod,
    })
  }

  async delete(id: string, userId: string): Promise<void> {
    const existing = await this.expenseRepo.findById(id)
    if (!existing || existing.userId !== userId)
      throw new DomainError(403, 'You do not have permission to access this expense')

    await this.expenseRepo.delete(id)
  }
}
