import { Request, Response } from 'express'
import { UserRequest } from '../_types/types'
import { handleError } from '../utils/errorHandler'
import { CreateExpanseSchema, UpdateExpanseSchema } from '../zodSchema'
import expensesService from '../services/expensesService'

async function list(req: UserRequest, res: Response): Promise<void> {
  try {
    const { expenses, total } = await expensesService.fetchAll(req)
    res.json({ data: expenses, total })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    res.status(500).send({ message })
  }
}

async function show(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    const foundExpense = await expensesService.fetchById(id, req)
    res.status(200).json(foundExpense)
  } catch (error: unknown) {
    handleError(error, res)
  }
}

async function create(req: Request, res: Response): Promise<void> {
  const isValidated = CreateExpanseSchema.strict().safeParse(req.body)

  if (!isValidated.success) res.status(400).json(isValidated.error)

  try {
    const newExpense = await expensesService.addNew(isValidated.data!, req)
    res.status(201).json(newExpense)
  } catch (error: unknown) {
    handleError(error, res)
  }
}

async function edit(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const isValidated = UpdateExpanseSchema.strict().safeParse(req.body)

  if (!isValidated.success) res.status(400).json(isValidated.error)
  const { data } = isValidated

  try {
    await expensesService.updateById(id, req, data!)
    res.status(204).send()
  } catch (error: any) {
    res.status(500).send({ message: error?.message })
  }
}

async function destroy(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  try {
    await expensesService.deleteById(id, req)
    res.status(204).send()
  } catch (error: any) {
    res.status(500).send({ message: error?.message })
  }
}

export default {
  list,
  show,
  create,
  edit,
  destroy,
}
