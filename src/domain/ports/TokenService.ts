export interface TokenPayload {
  id: string
  email: string
  iat: number
  exp: number
}

export interface ITokenService {
  sign(payload: { id: string; email: string }): string
  verify(token: string): TokenPayload
}
