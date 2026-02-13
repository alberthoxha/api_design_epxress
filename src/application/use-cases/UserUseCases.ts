import { UserPublic } from '../../domain/entities/User'
import { DomainError } from '../../domain/errors/DomainError'
import { IPasswordHasher } from '../../domain/ports/PasswordHasher'
import { ITokenService } from '../../domain/ports/TokenService'
import { IUserRepository } from '../../domain/ports/UserRepository'

export class UserUseCases {
  constructor(
    private userRepo: IUserRepository,
    private hasher: IPasswordHasher,
    private tokenService: ITokenService
  ) {}

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<{ token: string; user: UserPublic }> {
    const hashedPassword = await this.hasher.hash(password)
    const newUser = await this.userRepo.create({ name, email, password: hashedPassword })
    const token = this.tokenService.sign({ id: newUser.id, email: newUser.email })
    return {
      token,
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
    }
  }

  async login(email: string, password: string): Promise<{ token: string; user: UserPublic }> {
    const existingUser = await this.userRepo.findByEmail(email)
    if (!existingUser) throw new DomainError(404, 'User not found!')

    const isValid = await this.hasher.compare(password, existingUser.password)
    if (!isValid) throw new DomainError(404, 'User not found!')

    const token = this.tokenService.sign({ id: existingUser.id, email: existingUser.email })
    return {
      token,
      user: { id: existingUser.id, email: existingUser.email, name: existingUser.name },
    }
  }
}
