import { Response } from 'express'
import { NoteUseCases } from '../../../application/use-cases/NoteUseCases'
import { DomainError } from '../../../domain/errors/DomainError'
import { AuthenticatedRequest } from '../middleware/authenticate'
import { CreateNoteSchema, UpdateNoteSchema } from '../validation/schemas'

export class NoteController {
  constructor(private noteUseCases: NoteUseCases) {}

  list = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { notes, totalNotes } = await this.noteUseCases.list(req.user!.id)
      res.json({ data: notes, totalNotes })
    } catch (error: unknown) {
      this.handleError(error, res)
    }
  }

  show = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const note = await this.noteUseCases.getById(req.params.id, req.user!.id)
      res.status(200).json(note)
    } catch (error: unknown) {
      this.handleError(error, res)
    }
  }

  create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const parsed = CreateNoteSchema.strict().safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json(parsed.error)
      return
    }

    try {
      const newNote = await this.noteUseCases.create(req.user!.id, parsed.data)
      res.status(201).json(newNote)
    } catch (error: unknown) {
      this.handleError(error, res)
    }
  }

  edit = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const parsed = UpdateNoteSchema.strict().safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json(parsed.error)
      return
    }

    try {
      const updatedNote = await this.noteUseCases.update(req.params.id, req.user!.id, parsed.data)
      res.status(200).json(updatedNote)
    } catch (error: unknown) {
      this.handleError(error, res)
    }
  }

  destroy = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      await this.noteUseCases.delete(req.params.id, req.user!.id)
      res.status(204).send()
    } catch (error: unknown) {
      this.handleError(error, res)
    }
  }

  private handleError(error: unknown, res: Response): void {
    if (error instanceof DomainError) {
      res.status(error.statusCode).json({ message: error.message })
    } else {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred'
      res.status(500).json({ message })
    }
  }
}
