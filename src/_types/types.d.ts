import { Request } from 'express'

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

export interface UserRequestWithToken {
  token: string
  user: NewUser
}
