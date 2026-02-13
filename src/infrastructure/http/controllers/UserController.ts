import { Request, Response } from 'express'
import { UserUseCases } from '../../../application/use-cases/UserUseCases'
import { DomainError } from '../../../domain/errors/DomainError'
import { CreateUserSchema, LoginUserSchema } from '../validation/schemas'

export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  createNewUser = async (req: Request, res: Response): Promise<void> => {
    const parsed = CreateUserSchema.strict().safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json(parsed.error)
      return
    }

    try {
      const { name, email, password } = parsed.data
      const result = await this.userUseCases.register(name, email, password)
      res.json(result)
    } catch (error: unknown) {
      this.handleError(error, res)
    }
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const parsed = LoginUserSchema.strict().safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json(parsed.error)
      return
    }

    try {
      const { email, password } = parsed.data
      const result = await this.userUseCases.login(email, password)
      res.json(result)
    } catch (error: unknown) {
      this.handleError(error, res)
    }
  }

  logout = async (_: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie('cookies')
      res.status(200).json({ message: 'Logged out successfully' })
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
