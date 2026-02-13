import { PrismaClient } from '@prisma/client'
import { User } from '../../../domain/entities/User'
import { IUserRepository } from '../../../domain/ports/UserRepository'

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: { name: string; email: string; password: string }): Promise<User> {
    return this.prisma.user.create({ data })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } })
  }
}
