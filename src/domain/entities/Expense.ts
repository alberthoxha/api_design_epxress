export enum PaymentType {
  CARD = 'CARD',
  CASH = 'CASH',
}

export interface Expense {
  id: string
  amount: number
  description: string | null
  date: Date
  userId: string
  categoryId: string | null
  paymentMethod: PaymentType
  createdAt: Date
  updatedAt: Date
}

export interface ExpenseWithCategory extends Expense {
  category: { id: string; name: string } | null
}
