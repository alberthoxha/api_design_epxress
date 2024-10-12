/**
 * @swagger
 * tags:
 *   - name: Account
 *     description: User account operations
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
 */
