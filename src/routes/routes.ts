import { Request, Response, Router } from 'express'
import expensesController from '../controllers/expensesController'
import userController from '../controllers/userController'
import notesController from '../controllers/notesController'
import { authenticate } from '../middlewares/auth'

const api = Router()

api.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello there' })
})

api.post('/user/signup', userController.createNewUser)
api.post('/user/login', userController.login)
api.post('/user/logout', userController.logout)

api.get('/expenses', authenticate, expensesController.list)
api.get('/expenses/:id', authenticate, expensesController.show)
api.post('/expenses', authenticate, expensesController.create)
api.put('/expenses/:id', authenticate, expensesController.edit)
api.delete('/expenses/:id', authenticate, expensesController.destroy)

api.get('/notes', authenticate, notesController.list)
api.get('/notes/:id', authenticate, notesController.show)
api.post('/notes', authenticate, notesController.create)
api.put('/notes/:id', authenticate, notesController.edit)
api.delete('/notes/:id', authenticate, notesController.destroy)

export default Router().use('/api', api)
