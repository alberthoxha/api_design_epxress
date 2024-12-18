/**
 * @swagger
 * tags:
 *   - name: Account
 *     description: User account operations
 *   - name: Expenses
 *     description: Expense management operations
 *
 * /api/user/signup:
 *   post:
 *     tags: [Account]
 *     summary: Create new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The password for the user account
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: User created successfully
 *
 * /api/user/login:
 *   post:
 *     tags: [Account]
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The password for the user account
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 *
 * /api/expenses:
 *   get:
 *     tags: [Expenses]
 *     summary: Get all expenses
 *     responses:
 *       200:
 *         description: List of all expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "expense1"
 *                   amount:
 *                     type: number
 *                     example: 100.0
 *                   description:
 *                     type: string
 *                     example: "Grocery shopping"
 *
 * /api/expenses/{id}:
 *   get:
 *     tags: [Expenses]
 *     summary: Get an expense by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the expense
 *         schema:
 *           type: string
 *           example: "expense1"
 *     responses:
 *       200:
 *         description: Expense retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "expense1"
 *                 amount:
 *                   type: number
 *                   example: 100.0
 *                 description:
 *                   type: string
 *                   example: "Grocery shopping"
 *       404:
 *         description: Expense not found
 */
