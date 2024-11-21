import { Request, Response } from 'express'
import { UserRequest } from '../_types/types'
import { handleError } from '../utils/errorHandler'
import { CreateExpanseSchema, UpdateExpanseSchema } from '../zodSchema'
import expensesService from '../services/expensesService'

async function getAllExpenses(req: UserRequest, res: Response): Promise<void> {
  try {
    const { expenses, total } = await expensesService.getAllExpenses(req)
    res.json({ data: expenses, total })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    res.status(500).send({ message })
  }
}

async function getExpenseById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    const foundExpense = await expensesService.getExpenseById(id, req)
    res.status(200).json(foundExpense)
  } catch (error: unknown) {
    handleError(error, res)
  }
}

async function createExpense(req: Request, res: Response): Promise<void> {
  const isValidated = CreateExpanseSchema.strict().safeParse(req.body)

  if (!isValidated.success) res.status(400).json(isValidated.error)

  try {
    const newExpense = await expensesService.createExpense(isValidated.data!, req)
    res.status(201).json(newExpense)
  } catch (error: unknown) {
    handleError(error, res)
  }
}

async function updateExpenseById(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const isValidated = UpdateExpanseSchema.strict().safeParse(req.body)

  if (!isValidated.success) res.status(400).json(isValidated.error)
  const { data } = isValidated

  try {
    await expensesService.updateExpenseById(id, req, data!)
    res.status(204).send()
  } catch (error: any) {
    res.status(500).send({ message: error?.message })
  }
}

async function deleteExpenseById(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  try {
    await expensesService.deleteExpenseById(id, req)
    res.status(204).send()
  } catch (error: any) {
    res.status(500).send({ message: error?.message })
  }
}

export default {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpenseById,
  deleteExpenseById,
}
