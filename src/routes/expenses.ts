import { Router } from 'express'
import expensesController from '../controllers/expensesController'

const expensesRouter = Router()

expensesRouter.get('/', expensesController.getAllExpenses)
expensesRouter.get('/:id', expensesController.getExpenseById)
expensesRouter.post('/', expensesController.createExpense)
expensesRouter.put('/:id', expensesController.updateExpenseById)
expensesRouter.delete('/:id', expensesController.deleteExpenseById)

export default expensesRouter
