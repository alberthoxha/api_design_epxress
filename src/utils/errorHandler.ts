import { Response } from 'express'

export const handleError = (error: unknown, res: Response): void => {
  if ((error as any)?.errorCode) {
    const { errorCode, message } = error as { errorCode: number; message: string }
    res.status(errorCode).json({ message })
  } else {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    res.status(500).json({ message })
  }
}
