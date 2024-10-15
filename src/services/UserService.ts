import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import HttpException from '../errors/HttpException.ts '
import { CreateUserSchema, LoginUserSchema } from '../zodSchema'
import { comparePasswords, createJWT, hashPassword } from './../middlewares/auth'

class UserService {
  private prisma = new PrismaClient()

  async createNewUser(userData: z.infer<typeof CreateUserSchema>) {
    const user = await this.prisma.user.create({
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

  async login(userData: z.infer<typeof LoginUserSchema>) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    })

    if (!user) throw new HttpException(404, 'User not found!')

    const isValid = await comparePasswords(userData.password, user.password)
    if (!isValid) throw new HttpException(404, 'User not found!')

    const token = createJWT(user)
    return { token }
  }
}

export default new UserService()
