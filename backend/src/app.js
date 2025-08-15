import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import { connectDB } from './config/db.js'
import { errorHandler, notFound } from './middleware/error.js'
import authRoutes from './routes/auth.routes.js'
import healthRoutes from './routes/health.routes.js'
import userRoutes from './routes/user.routes.js'
import skillRoutes from './routes/skill.routes.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/skills', skillRoutes)

// Health root
app.get('/', (_req, res) => {
  res.json({ ok: true, name: 'hr-ai-suite-backend' })
})

// 404 and Error handlers
app.use(notFound)
app.use(errorHandler)

// Bootstrap
const PORT = process.env.PORT || 4000
const { MONGODB_URI } = process.env
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not set. Please configure it in backend/.env to your MongoDB Atlas URI.')
}

await connectDB(MONGODB_URI)

app.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`)
})

