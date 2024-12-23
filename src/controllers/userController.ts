import { Request, Response } from 'express'
import userService from '../services/userService'
import { handleError } from '../utils/errorHandler'
import { CreateUserSchema, LoginUserSchema } from '../zodSchema'

async function createNewUser(req: Request, res: Response): Promise<void> {
  const newUser = CreateUserSchema.strict().safeParse(req.body)
  if (!newUser.success) res.status(400).json(newUser.error)

  try {
    const { token, user } = await userService.createNewUser(req)
    const { password, ...newUser } = user
    res.json({ token, user: newUser })
  } catch (error: unknown) {
    handleError(error, res)
  }
}

async function login(req: Request, res: Response): Promise<void> {
  const loginUser = LoginUserSchema.strict().safeParse(req.body)

  if (!loginUser.success) {
    res.status(400).json(loginUser.error)
    return
  }

  try {
    const { token, user } = await userService.login(req)
    const { password, ...loginResponse } = user
    res.json({ token, user: loginResponse })
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
