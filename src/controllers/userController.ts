import { Request, Response } from 'express'
import { CreateUserSchema, LoginUserSchema } from '../zodSchema'
import { handleError } from '../utils/errorHandler'
import userService from '../services/userService'

async function createNewUser(req: Request, res: Response): Promise<void> {
  const newUser = CreateUserSchema.strict().safeParse(req.body)

  if (!newUser.success) res.status(400).json(newUser.error)

  try {
    const { token, user } = await userService.createNewUser(newUser.data!)
    res.json({ token, user })
  } catch (error: unknown) {
    handleError(error, res)
  }
}

async function login(req: Request, res: Response): Promise<void> {
  const loginUser = LoginUserSchema.strict().safeParse(req.body)

  if (!loginUser.success) res.status(400).json(loginUser.error)

  try {
    const { token, user } = await userService.login(req.body)
    res.json({ token, user })
  } catch (error: unknown) {
    handleError(error, res)
  }
}

async function logout(_: Request, res: Response): Promise<void> {
  try {
    res.clearCookie('cookies')
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error: unknown) {
    handleError(error, res)
  }
}

export default {
  createNewUser,
  login,
  logout,
}
