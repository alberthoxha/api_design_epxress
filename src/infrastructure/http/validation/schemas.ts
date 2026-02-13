import * as z from 'zod'
import { PaymentType } from '../../../domain/entities/Expense'

export const CreateUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(50, { message: 'Name must not exceed 50 characters.' }),
})

export const LoginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export const CreateExpanseSchema = z.object({
  amount: z.number().multipleOf(0.01).min(1),
  description: z.string(),
  category: z.string(),
  paymentMethod: z.nativeEnum(PaymentType),
})

export const UpdateExpanseSchema = z.object({
  amount: z.number().multipleOf(0.01).min(1),
  description: z.string(),
  category: z.string(),
  paymentMethod: z.nativeEnum(PaymentType),
})

export const CreateNoteSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})

export const UpdateNoteSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})
