import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.model.js'
import { signJwt } from '../utils/jwt.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// POST /api/auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {}
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email and password are required' })
    }

    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ error: 'Email already in use' })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash })

    const token = signJwt({ sub: user._id.toString(), email })
    res.status(201).json({ user: user.toSafeJSON(), token })
  } catch (err) {
    next(err)
  }
})

// POST /api/auth/signin
router.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' })

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

    const token = signJwt({ sub: user._id.toString(), email })
    res.json({ user: user.toSafeJSON(), token })
  } catch (err) {
    next(err)
  }
})

// GET /api/auth/me
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.sub)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ user: user.toSafeJSON() })
  } catch (err) {
    next(err)
  }
})

export default router
