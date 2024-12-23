import { Request, Response } from 'express'
import notesServices from '../services/notesServices'
import { CreateNoteSchema, UpdateNoteSchema } from '../zodSchema'

async function list(req: Request, res: Response): Promise<void> {
  try {
    const { notes, totalNotes } = await notesServices.fetchAll(req)
    res.json({ data: notes, totalNotes })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    res.status(500).send({ message })
  }
}

async function show(req: Request, res: Response): Promise<void> {
  try {
    const note = await notesServices.fetchById(req)
    res.status(200).json(note)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    res.status(500).send({ message })
  }
}

async function create(req: Request, res: Response): Promise<void> {
  const isValidated = CreateNoteSchema.strict().safeParse(req.body)
  if (!isValidated.success) res.status(400).json(isValidated.error)

  try {
    const newNote = await notesServices.addNew(req)
    res.status(201).json(newNote)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    res.status(500).send({ message })
  }
}

async function edit(req: Request, res: Response): Promise<void> {
  const isValidated = UpdateNoteSchema.strict().safeParse(req.body)
  if (!isValidated.success) res.status(400).json(isValidated.error)

  try {
    const updatedNote = await notesServices.updateById(req)
    res.status(200).json(updatedNote)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    res.status(500).send({ message })
  }
}

async function destroy(req: Request, res: Response): Promise<void> {
  try {
    await notesServices.deleteById(req)
    res.status(204).send()
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    res.status(500).send({ message })
  }
}

export default {
  list,
  show,
  create,
  edit,
  destroy,
}
