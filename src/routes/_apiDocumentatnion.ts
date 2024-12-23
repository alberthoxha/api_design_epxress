/**
 * @swagger
 * tags:
 *   - name: Account
 *     description: User account operations
 *   - name: Expenses
 *     description: Expense management operations
 *   - name: Notes
 *     description: Note management operations
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
 *   post:
 *     tags: [Expenses]
 *     summary: Create a new expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount of the expense
 *                 example: 100.0
 *               description:
 *                 type: string
 *                 description: The description of the expense
 *                 example: "Grocery shopping"
 *               category:
 *                 type: string
 *                 description: The category of the expense
 *                 example: "Food"
 *               paymentMethod:
 *                 type: string
 *                 description: The payment method used
 *                 example: "Credit Card"
 *     responses:
 *       201:
 *         description: Expense created successfully
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
 *
 *   put:
 *     tags: [Expenses]
 *     summary: Update an expense by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the expense
 *         schema:
 *           type: string
 *           example: "expense1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount of the expense
 *                 example: 150.0
 *               description:
 *                 type: string
 *                 description: The description of the expense
 *                 example: "Updated grocery shopping"
 *               category:
 *                 type: string
 *                 description: The category of the expense
 *                 example: "Food"
 *               paymentMethod:
 *                 type: string
 *                 description: The payment method used
 *                 example: "Debit Card"
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *
 *   delete:
 *     tags: [Expenses]
 *     summary: Delete an expense by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the expense
 *         schema:
 *           type: string
 *           example: "expense1"
 *     responses:
 *       204:
 *         description: Expense deleted successfully
 *
 * /api/notes:
 *   get:
 *     tags: [Notes]
 *     summary: Get all notes
 *     responses:
 *       200:
 *         description: List of all notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "note1"
 *                   title:
 *                     type: string
 *                     example: "Meeting notes"
 *                   content:
 *                     type: string
 *                     example: "Discuss project milestones"
 *
 *   post:
 *     tags: [Notes]
 *     summary: Create a new note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the note
 *                 example: "Meeting notes"
 *               content:
 *                 type: string
 *                 description: The content of the note
 *                 example: "Discuss project milestones"
 *     responses:
 *       201:
 *         description: Note created successfully
 *
 * /api/notes/{id}:
 *   get:
 *     tags: [Notes]
 *     summary: Get a note by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the note
 *         schema:
 *           type: string
 *           example: "note1"
 *     responses:
 *       200:
 *         description: Note retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "note1"
 *                 title:
 *                   type: string
 *                   example: "Meeting notes"
 *                 content:
 *                   type: string
 *                   example: "Discuss project milestones"
 *       404:
 *         description: Note not found
 *
 *   put:
 *     tags: [Notes]
 *     summary: Update a note by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the note
 *         schema:
 *           type: string
 *           example: "note1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the note
 *                 example: "Updated meeting notes"
 *               content:
 *                 type: string
 *                 description: The content of the note
 *                 example: "Updated discussion on project milestones"
 *     responses:
 *       200:
 *         description: Note updated successfully
 *
 *   delete:
 *     tags: [Notes]
 *     summary: Delete a note by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the note
 *         schema:
 *           type: string
 *           example: "note1"
 *     responses:
 *       204:
 *         description: Note deleted successfully
 */
