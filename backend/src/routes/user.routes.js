import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { User } from '../models/user.model.js'

const router = Router()

// GET /api/users/me - return full profile
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.sub)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ user: user.toSafeJSON() })
  } catch (err) {
    next(err)
  }
})

// PATCH /api/users/me - update profile fields
router.patch('/me', requireAuth, async (req, res, next) => {
  try {
    const allowed = [
      'name',
      'title',
      'bio',
      'location',
      'experienceYears',
      'department',
      'reportsTo',
      'skills',
      'badges',
      'links', // expects { linkedin, slack, website }
    ]

    const updates = {}
    for (const key of allowed) {
      if (req.body && Object.prototype.hasOwnProperty.call(req.body, key)) {
        updates[key] = req.body[key]
      }
    }

    const user = await User.findByIdAndUpdate(req.user.sub, updates, {
      new: true,
      runValidators: true,
    })
    if (!user) return res.status(404).json({ error: 'User not found' })

    res.json({ user: user.toSafeJSON() })
  } catch (err) {
    next(err)
  }
})

export default router
