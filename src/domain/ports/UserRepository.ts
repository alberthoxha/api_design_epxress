import { User } from '../entities/User'

export interface IUserRepository {
  create(data: { name: string; email: string; password: string }): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
