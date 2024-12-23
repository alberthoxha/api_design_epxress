import { UserRequest } from '../_types/types'
import { createHttpException } from '../errors/HttpException'
import prisma from '../prisma/client'
import { CreateExpenseDTO, UpdateExpenseDTO } from './../_types/types.d'

async function fetchAll(req: UserRequest): Promise<any> {
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
}

async function fetchById(req: UserRequest): Promise<any> {
  const { id } = req.params

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
}

async function addNew(req: UserRequest): Promise<any> {
  const { amount, description, category, paymentMethod } = req.body as CreateExpenseDTO

  if (!req.user) throw createHttpException(404, 'User not found')
  const { id: userId } = req.user

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

async function updateById(req: UserRequest): Promise<any> {
  const { amount, category, description, paymentMethod } = req.body as UpdateExpenseDTO
  const { id: expenseId } = req.params

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

async function deleteById(req: UserRequest): Promise<void> {
  const { id: expenseId } = req.params

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
  fetchAll,
  fetchById,
  addNew,
  updateById,
  deleteById,
}
