import { DomainError } from '../../domain/errors/DomainError'
import { INoteRepository } from '../../domain/ports/NoteRepository'

export class NoteUseCases {
  constructor(private noteRepo: INoteRepository) {}

  async list(userId: string) {
    return this.noteRepo.findAllByUserId(userId)
  }

  async getById(id: string, userId: string) {
    const note = await this.noteRepo.findById(id)
    if (!note || note.userId !== userId)
      throw new DomainError(403, 'You do not have permission to access this note')
    return note
  }

  async create(userId: string, data: { title: string; content: string }) {
    return this.noteRepo.create({ title: data.title, content: data.content, userId })
  }

  async update(id: string, userId: string, data: { title: string; content: string }) {
    const note = await this.noteRepo.findById(id)
    if (!note || note.userId !== userId)
      throw new DomainError(403, 'You do not have permission to access this note')
    return this.noteRepo.update(id, { title: data.title, content: data.content })
  }

  async delete(id: string, userId: string) {
    const note = await this.noteRepo.findById(id)
    if (!note || note.userId !== userId)
      throw new DomainError(403, 'You do not have permission to access this note')
    await this.noteRepo.delete(id)
  }
}
