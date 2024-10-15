import { Request, Response } from 'express'
import userService from '../services/UserService'
import { CreateUserSchema, LoginUserSchema } from '../zodSchema'
import { handleError } from '../utils/errorHandler'

class UserController {
  async createNewUser(req: Request, res: Response) {
    const newUser = CreateUserSchema.strict().safeParse(req.body)

    if (!newUser.success) res.status(400).json(newUser.error)

    try {
      const { token } = await userService.createNewUser(newUser.data!)
      res.json({ token })
    } catch (error: unknown) {
      handleError(error, res)
    }
  }

  async login(req: Request, res: Response) {
    const loginUser = LoginUserSchema.strict().safeParse(req.body)

    if (!loginUser.success) res.status(400).json(loginUser.error)

    try {
      const { token } = await userService.login(req.body)
      res.json({ token })
    } catch (error: unknown) {
      handleError(error, res)
    }
  }

  async logout(_: Request, res: Response) {
    try {
      res.clearCookie('cookies')
      res.status(200).json({ message: 'Logged out successfully' })
    } catch (error: unknown) {
      handleError(error, res)
    }
  }
}

export default new UserController()
