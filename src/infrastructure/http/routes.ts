import { Request, Response, Router } from 'express'
import { UserController } from './controllers/UserController'
import { ExpenseController } from './controllers/ExpenseController'
import { NoteController } from './controllers/NoteController'

export function createRouter(
  authenticate: any,
  userController: UserController,
  expenseController: ExpenseController,
  noteController: NoteController
) {
  const api = Router()

  api.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello there' })
  })

  api.post('/user/signup', userController.createNewUser)
  api.post('/user/login', userController.login)
  api.post('/user/logout', userController.logout)

  api.get('/expenses', authenticate, expenseController.list)
  api.get('/expenses/:id', authenticate, expenseController.show)
  api.post('/expenses', authenticate, expenseController.create)
  api.put('/expenses/:id', authenticate, expenseController.edit)
  api.delete('/expenses/:id', authenticate, expenseController.destroy)

  api.get('/notes', authenticate, noteController.list)
  api.get('/notes/:id', authenticate, noteController.show)
  api.post('/notes', authenticate, noteController.create)
  api.put('/notes/:id', authenticate, noteController.edit)
  api.delete('/notes/:id', authenticate, noteController.destroy)

  return Router().use('/api', api)
}
