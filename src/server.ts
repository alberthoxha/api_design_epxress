import cors from 'cors'
import express, { Express } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import routes from './routes/routes'
import { swaggerSpec } from './swagger/swagger'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default app
