import { Request, Response, Router } from 'express'
import expensesController from '../controllers/expensesController'
import userController from '../controllers/userController'
import noteController from '../controllers/notesController'
import { authenticate } from '../middlewares/auth'

const api = Router()

api.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello there' })
})

api.post('/user/signup', userController.createNewUser)
api.post('/user/login', userController.login)
api.post('/user/logout', userController.logout)

api.get('/expenses', authenticate, expensesController.getAllExpenses)
api.get('/expenses/:id', authenticate, expensesController.getExpenseById)
api.post('/expenses', authenticate, expensesController.createExpense)
api.put('/expenses/:id', authenticate, expensesController.updateExpenseById)
api.delete('/expenses/:id', authenticate, expensesController.deleteExpenseById)

api.get('/notes', authenticate, noteController.list)
api.get('/notes/:id', authenticate, noteController.show)
api.post('/notes', authenticate, noteController.create)
api.put('/notes/:id', authenticate, noteController.edit)
api.delete('/notes/:id', authenticate, noteController.destroy)

export default Router().use('/api', api)
