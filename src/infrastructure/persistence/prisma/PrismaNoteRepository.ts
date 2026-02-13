import { PrismaClient } from '@prisma/client'
import { Note } from '../../../domain/entities/Note'
import { INoteRepository } from '../../../domain/ports/NoteRepository'

export class PrismaNoteRepository implements INoteRepository {
  constructor(private prisma: PrismaClient) {}

  async findAllByUserId(userId: string): Promise<{ notes: Note[]; totalNotes: number }> {
    const [notes, totalNotes] = await Promise.all([
      this.prisma.note.findMany({ where: { userId } }),
      this.prisma.note.count({ where: { userId } }),
    ])
    return { notes, totalNotes }
  }

  async findById(id: string): Promise<Note | null> {
    return this.prisma.note.findUnique({ where: { id } })
  }

  async create(data: { title: string; content: string; userId: string }): Promise<Note> {
    return this.prisma.note.create({ data })
  }

  async update(id: string, data: { title: string; content: string }): Promise<Note> {
    return this.prisma.note.update({ where: { id }, data })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.note.delete({ where: { id } })
  }
}
