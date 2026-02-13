import jwt from 'jsonwebtoken'
import { ITokenService, TokenPayload } from '../../domain/ports/TokenService'

export class JwtTokenService implements ITokenService {
  private readonly secret: string

  constructor() {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables')
    }
    this.secret = secret
  }

  sign(payload: { id: string; email: string }): string {
    return jwt.sign({ id: payload.id, email: payload.email }, this.secret, { expiresIn: '1h' })
  }

  verify(token: string): TokenPayload {
    return jwt.verify(token, this.secret) as TokenPayload
  }
}
