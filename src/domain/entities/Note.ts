export interface Note {
  id: string
  title: string
  content: string | null
  createdAt: Date
  updatedAt: Date
  userId: string
}
