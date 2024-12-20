import cors from 'cors'
import express, { Express } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import routes from './routes/routes'
import { swaggerSpec } from './swagger/swagger'

const app = express()

// Metro waiting on exp://192.168.100.83:8081
// › Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

// › Web is waiting on http://localhost:8081

app.use(
  cors({
    origin: ['http://192.168.100.83:8081', 'http://localhost:8081'], // Allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Necessary if using cookies/auth headers
  })
)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default app
