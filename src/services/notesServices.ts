import { CreateNoteDTO, UpdateNoteDTO, UserRequest } from '../_types/types'
import { createHttpException } from '../errors/HttpException'
import prisma from '../prisma/client'

async function fetchAll(req: UserRequest): Promise<any> {
  try {
    if (!req.user) throw createHttpException(404, 'User not found!')
    const notes = await prisma.note.findMany({
      where: { userId: req.user.id },
    })

    const totalNotes = await prisma.note.count({
      where: { userId: req.user.id },
    })

    return { notes, totalNotes }
  } catch (error) {
    throw error
  }
}

async function fetchById(req: UserRequest): Promise<any> {
  try {
    const { id: NoteId } = req.params

    const note = await prisma.note.findUnique({
      where: { id: NoteId },
    })

    if (!req.user) throw createHttpException(404, 'User not found!')
    if (!note || note.userId !== req.user.id!)
      throw createHttpException(403, 'You do not have permission to access this note')

    return note
  } catch (error) {
    throw error
  }
}

async function addNew(req: UserRequest): Promise<any> {
  try {
    const { title, content } = req.body as CreateNoteDTO
    if (!req.user) throw createHttpException(404, 'User not found')

    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        userId: req.user.id,
      },
    })

    return newNote
  } catch (error) {
    throw error
  }
}

async function updateById(req: UserRequest): Promise<any> {
  try {
    const { title, content } = req.body as UpdateNoteDTO
    const { id } = req.params
    if (!req.user) throw createHttpException(404, 'User not found')

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
      },
    })

    return updatedNote
  } catch (error) {
    throw error
  }
}

async function deleteById(req: UserRequest): Promise<any> {
  try {
    if (!req.user) throw createHttpException(404, 'User not found')
    const { id } = req.params

    const note = await prisma.note.findUnique({
      where: { id },
    })

    if (!note || note.userId !== req.user.id)
      throw createHttpException(403, 'You do not have permission to access this note')

    await prisma.note.delete({
      where: { id },
    })

    return
  } catch (error) {
    throw error
  }
}

export default {
  fetchAll,
  fetchById,
  addNew,
  updateById,
  deleteById,
}
