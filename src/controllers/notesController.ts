import { Request, Response } from 'express'
import { UserRequest } from '../_types/types'
import notesServices from '../services/notesServices'

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
    const { id } = req.params
    const note = await notesServices.fetchById(id, req)
    res.status(200).json(note)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    res.status(500).send({ message })
  }
}

async function create(req: Request, res: Response): Promise<void> {
  try {
    const newNote = await notesServices.addNew(req)
    res.status(201).json(newNote)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    res.status(500).send({ message })
  }
}

async function edit(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    const updatedNote = await notesServices.updateById(id, req)
    res.status(200).json(updatedNote)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    res.status(500).send({ message })
  }
}

async function destroy(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    await notesServices.deleteById(id, req)
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
