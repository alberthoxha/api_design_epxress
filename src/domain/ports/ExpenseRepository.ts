import { Expense, ExpenseWithCategory, PaymentType } from '../entities/Expense'

export interface IExpenseRepository {
  findAllByUserId(userId: string): Promise<{ expenses: ExpenseWithCategory[]; total: number }>
  findById(id: string): Promise<ExpenseWithCategory | null>
  create(data: {
    amount: number
    description: string
    userId: string
    categoryId: string | null
    paymentMethod: PaymentType
  }): Promise<Expense>
  update(
    id: string,
    data: {
      amount: number
      description: string
      categoryId: string | null
      paymentMethod: PaymentType
    }
  ): Promise<Expense>
  delete(id: string): Promise<void>
}
