import { Request } from 'express'
import { CreateUserDTO, LoginUserDTO, UserRequest, UserRequestWithToken } from '../_types/types'
import { createHttpException } from '../errors/HttpException'
import { comparePasswords, createJWT, hashPassword } from '../middlewares/auth'
import prisma from '../prisma/client'

async function createNewUser(req: UserRequest): Promise<UserRequestWithToken> {
  const { name, email, password } = req.body as CreateUserDTO

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
    },
  })

  const token = createJWT(newUser)
  return {
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      password: newUser.password,
    },
  }
}

async function login(req: Request): Promise<UserRequestWithToken> {
  const { email, password } = req.body as LoginUserDTO

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!existingUser) throw createHttpException(404, 'User not found!')

  const isValid = await comparePasswords(password, existingUser.password)
  if (!isValid) throw createHttpException(404, 'User not found!')

  const token = createJWT(existingUser)
  return { token, user: existingUser }
}

export default {
  createNewUser,
  login,
}
