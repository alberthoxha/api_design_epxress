import { NextFunction, Request, Response } from 'express'
import { ITokenService } from '../../../domain/ports/TokenService'

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    iat: number
    exp: number
  }
}

export function createAuthMiddleware(tokenService: ITokenService) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    const bearer = req.headers.authorization?.split(' ')[1]

    if (!bearer) {
      return res.status(401).json({ message: 'not authorized' })
    }

    try {
      req.user = tokenService.verify(bearer)
      next()
    } catch (e) {
      console.error(e)
      return res.status(401).json({ message: 'not valid token' })
    }
  }
}
