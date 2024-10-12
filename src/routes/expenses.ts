import { Router } from 'express'
import expensesController from '../controllers/expensesController'

const expensesRouter = Router()

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Returns all expense
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: the list of expense
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/PrismaClient'
 */
expensesRouter.get('/', expensesController.getAllExpenses)
expensesRouter.get('/:id', expensesController.getExpenseById)
expensesRouter.post('/', expensesController.createExpense)
expensesRouter.put('/:id', expensesController.updateExpenseById)
expensesRouter.delete('/:id', expensesController.deleteExpenseById)

export default expensesRouter
