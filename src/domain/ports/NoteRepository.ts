import { Note } from '../entities/Note'

export interface INoteRepository {
  findAllByUserId(userId: string): Promise<{ notes: Note[]; totalNotes: number }>
  findById(id: string): Promise<Note | null>
  create(data: { title: string; content: string; userId: string }): Promise<Note>
  update(id: string, data: { title: string; content: string }): Promise<Note>
  delete(id: string): Promise<void>
}
