import bcrypt from 'bcrypt'
import { IPasswordHasher } from '../../domain/ports/PasswordHasher'

export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 5)
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
