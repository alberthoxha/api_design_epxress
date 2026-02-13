import { Response } from 'express'
import { ExpenseUseCases } from '../../../application/use-cases/ExpenseUseCases'
import { DomainError } from '../../../domain/errors/DomainError'
import { AuthenticatedRequest } from '../middleware/authenticate'
import { CreateExpanseSchema, UpdateExpanseSchema } from '../validation/schemas'

export class ExpenseController {
  constructor(private expenseUseCases: ExpenseUseCases) {}

  list = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { expenses, total } = await this.expenseUseCases.list(req.user!.id)
      res.json({ data: expenses, total })
    } catch (error: unknown) {
      this.handleError(error, res)
    }
  }

  show = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const expense = await this.expenseUseCases.getById(req.params.id, req.user!.id)
      res.status(200).json(expense)
    } catch (error: unknown) {
      this.handleError(error, res)
    }
  }

  create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const parsed = CreateExpanseSchema.strict().safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json(parsed.error)
      return
    }

    try {
      const newExpense = await this.expenseUseCases.create(req.user!.id, parsed.data)
      res.status(201).json(newExpense)
    } catch (error: unknown) {
      this.handleError(error, res)
    }
  }

  edit = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const parsed = UpdateExpanseSchema.strict().safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json(parsed.error)
      return
    }

    try {
      await this.expenseUseCases.update(req.params.id, req.user!.id, parsed.data)
      res.status(204).send()
    } catch (error: unknown) {
      this.handleError(error, res)
    }
  }

  destroy = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      await this.expenseUseCases.delete(req.params.id, req.user!.id)
      res.status(204).send()
    } catch (error: unknown) {
      this.handleError(error, res)
    }
  }

  private handleError(error: unknown, res: Response): void {
    if (error instanceof DomainError) {
      res.status(error.statusCode).json({ message: error.message })
    } else {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred'
      res.status(500).json({ message })
    }
  }
}
