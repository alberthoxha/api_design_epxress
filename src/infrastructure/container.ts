import { UserUseCases } from '../application/use-cases/UserUseCases'
import { ExpenseUseCases } from '../application/use-cases/ExpenseUseCases'
import { NoteUseCases } from '../application/use-cases/NoteUseCases'

import prisma from './persistence/prisma/client'
import { PrismaUserRepository } from './persistence/prisma/PrismaUserRepository'
import { PrismaExpenseRepository } from './persistence/prisma/PrismaExpenseRepository'
import { PrismaCategoryRepository } from './persistence/prisma/PrismaCategoryRepository'
import { PrismaNoteRepository } from './persistence/prisma/PrismaNoteRepository'

import { BcryptPasswordHasher } from './security/BcryptPasswordHasher'
import { JwtTokenService } from './security/JwtTokenService'

import { createAuthMiddleware } from './http/middleware/authenticate'
import { UserController } from './http/controllers/UserController'
import { ExpenseController } from './http/controllers/ExpenseController'
import { NoteController } from './http/controllers/NoteController'
import { createRouter } from './http/routes'

// Repositories
const userRepo = new PrismaUserRepository(prisma)
const expenseRepo = new PrismaExpenseRepository(prisma)
const categoryRepo = new PrismaCategoryRepository(prisma)
const noteRepo = new PrismaNoteRepository(prisma)

// Security adapters
const passwordHasher = new BcryptPasswordHasher()
const tokenService = new JwtTokenService()

// Use cases
const userUseCases = new UserUseCases(userRepo, passwordHasher, tokenService)
const expenseUseCases = new ExpenseUseCases(expenseRepo, categoryRepo)
const noteUseCases = new NoteUseCases(noteRepo)

// HTTP layer
const authenticate = createAuthMiddleware(tokenService)
const userController = new UserController(userUseCases)
const expenseController = new ExpenseController(expenseUseCases)
const noteController = new NoteController(noteUseCases)

// Router
export const router = createRouter(authenticate, userController, expenseController, noteController)
