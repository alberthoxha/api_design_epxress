import { CreateUserSchema, LoginUserSchema } from './../zodSchema'
import { Request } from 'express'
import { z } from 'zod'
import { CreateExpanseSchema, UpdateExpanseSchema, CreateUserSchema } from '../zodSchema'

export interface Token {
  token: string
}
export interface UserRequest extends Request {
  user?: {
    id: string
    email: string
    iat: number
    exp: number
  }
}

export interface NewUser {
  id: string
  email: string
  name: string
}

export interface UserLoginResponse {
  id: string
  name: string
  email: string
  password: string
}

export interface UserRequestWithToken {
  token: string
  user: UserLoginResponse
}

export type CreateUserDTO = z.infer<typeof CreateUserSchema>
export type LoginUserDTO = z.infer<typeof LoginUserSchema>

export type CreateExpenseDTO = z.infer<typeof CreateExpanseSchema>
export type UpdateExpenseDTO = z.infer<typeof UpdateExpanseSchema>

export type CreateNoteDTO = z.infer<typeof CreateNoteSchema>
export type UpdateNoteDTO = z.infer<typeof UpdateNoteSchema>
