import { z } from 'zod'
import { UserRequest } from '../_types/types'
import prisma from '../prisma/client'
import { CreateExpanseSchema, UpdateExpanseSchema } from '../zodSchema'
import { createHttpException } from '../errors/HttpException'

async function getAllExpenses(req: UserRequest): Promise<any> {
  try {
    if (!req.user) throw createHttpException(404, 'User not found!')
    const expenses = await prisma.expense.findMany({
      where: { userId: req.user.id },
      include: { category: true },
    })

    const total = await prisma.expense.count({
      where: { userId: req.user.id },
    })

    const formattedExpenses = expenses.map((expense) => ({
      ...expense,
      category: expense.category?.name,
      paymentMethod: expense.paymentMethod,
    }))

    return { expenses: formattedExpenses, total }
  } catch (error) {
    throw error
  }
}

async function getExpenseById(id: string, req: UserRequest): Promise<any> {
  try {
    const foundExpense = await prisma.expense.findUnique({
      where: { id },
      include: { category: true },
    })

    if (!req.user) throw createHttpException(404, 'User not found!')
    if (!foundExpense || foundExpense.userId !== req.user.id!)
      throw createHttpException(403, 'You do not have permission to access this expense')

    const formattedExpense = {
      ...foundExpense,
      category: foundExpense?.category?.name,
      paymentMethod: foundExpense?.paymentMethod,
    }

    return formattedExpense
  } catch (error) {
    throw error
  }
}

async function createExpense(
  expenseData: z.infer<typeof CreateExpanseSchema>,
  req: UserRequest
): Promise<any> {
  const { amount, description, category, paymentMethod } = expenseData

  if (!req.user) throw createHttpException(404, 'User not found')
  const userId = req.user.id

  const categoryId = category
    ? (
        await prisma.category.upsert({
          where: { name: category },
          update: {},
          create: { name: category },
        })
      ).id
    : null

  return await prisma.expense.create({
    data: {
      amount,
      description,
      userId,
      categoryId,
      paymentMethod,
    },
  })
}

async function updateExpenseById(
  expenseId: string,
  req: UserRequest,
  updateValue: z.infer<typeof UpdateExpanseSchema>
): Promise<any> {
  const { amount, category, description, paymentMethod } = updateValue
  if (!req.user) throw createHttpException(404, 'User not found!')

  const existingExpense = await prisma.expense.findUnique({
    where: {
      id: expenseId,
    },
  })

  if (!existingExpense || existingExpense.userId !== req.user.id)
    throw createHttpException(403, 'You do not have permission to access this expense')

  const categoryId = category
    ? (
        await prisma.category.upsert({
          where: { name: category },
          update: {},
          create: { name: category },
        })
      ).id
    : existingExpense.categoryId

  return await prisma.expense.update({
    where: { id: expenseId },
    data: { amount, description, categoryId, paymentMethod },
  })
}

async function deleteExpenseById(expenseId: string, req: UserRequest): Promise<void> {
  const expenseToDelete = await prisma.expense.findUnique({
    where: {
      id: expenseId,
    },
  })

  if (!req.user) throw createHttpException(404, 'User not found!')

  if (!expenseToDelete || expenseToDelete.userId !== req.user.id)
    throw createHttpException(403, 'You do not have permission to access this expense')

  await prisma.expense.delete({
    where: {
      id: expenseId,
    },
  })
}

export default {
  getAllExpenses,
  deleteExpenseById,
  getExpenseById,
  createExpense,
  updateExpenseById,
}
