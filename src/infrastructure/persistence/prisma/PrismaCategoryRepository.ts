import { PrismaClient } from '@prisma/client'
import { Category } from '../../../domain/entities/Category'
import { ICategoryRepository } from '../../../domain/ports/CategoryRepository'

export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaClient) {}

  async upsertByName(name: string): Promise<Category> {
    return this.prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }
}
