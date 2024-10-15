import { Response } from 'express'
import HttpException from '../errors/HttpException.ts '

export const handleError = (error: unknown, res: Response): void => {
  if (error instanceof HttpException) {
    res.status(error.errorCode).json({ message: error.message })
  } else {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    res.status(500).json({ message })
  }
}
