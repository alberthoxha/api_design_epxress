import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserRequest } from '../_types/types'

export const comparePasswords = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5)
}

export const createJWT = (user: User, expiresIn: string = '1h'): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment variables')
  }
  const token = jwt.sign({ id: user?.id, email: user?.email }, secret, { expiresIn })
  return token
}

export const authenticate = (req: UserRequest, res: Response, next: NextFunction): any => {
  const bearer = req.headers.authorization?.split(' ')[1]

  if (!bearer) {
    return res.status(401).json({ message: 'not authorized' })
  }

  try {
    req.user = jwt.verify(bearer, process.env.JWT_SECRET!) as jwt.JwtPayload as any
    next()
  } catch (e) {
    console.error(e)
    return res.status(401).json({ message: 'not valid token' })
  }
}
