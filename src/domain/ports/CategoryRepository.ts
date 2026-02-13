import { Category } from '../entities/Category'

export interface ICategoryRepository {
  upsertByName(name: string): Promise<Category>
}
