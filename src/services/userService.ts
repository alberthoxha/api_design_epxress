import { z } from 'zod'
import { comparePasswords, createJWT, hashPassword } from '../middlewares/auth'
import prisma from '../prisma/client'
import { CreateUserSchema, LoginUserSchema } from '../zodSchema'
import { UserRequestWithToken } from '../_types/types'
import { createHttpException } from '../errors/HttpException'

async function createNewUser(
  userData: z.infer<typeof CreateUserSchema>
): Promise<UserRequestWithToken> {
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: await hashPassword(userData.password),
    },
  })

  const token = createJWT(user)
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  }
}

async function login(userData: z.infer<typeof LoginUserSchema>): Promise<UserRequestWithToken> {
  const user = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  })

  if (!user) throw createHttpException(404, 'User not found!')

  const isValid = await comparePasswords(userData.password, user.password)
  if (!isValid) throw createHttpException(404, 'User not found!')

  const token = createJWT(user)
  return { token, user }
}

export default {
  createNewUser,
  login,
}
