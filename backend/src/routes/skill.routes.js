import express from 'express'
import { requireAuth } from '../middleware/auth.js'
import SkillAnalysis from '../models/skillAnalysis.model.js'
import { extractRequiredSkills, computeGaps, computeOverallScore, recommendCourses } from '../services/skillNLP.js'

const router = express.Router()

// Analyze and persist a new skill gap analysis
// POST /api/skills/analyze
// Body: { employeeName?, currentSkills: string[], targetRole?, jobRequirements: string }
router.post('/analyze', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.sub
    const { employeeName = '', currentSkills = [], targetRole = '', jobRequirements = '' } = req.body || {}

    // Extract and compute
    const { skills: requiredSkills, scored: requiredScored } = extractRequiredSkills(jobRequirements)
    const gaps = computeGaps(currentSkills, requiredScored)
    const overallScore = computeOverallScore(currentSkills, requiredSkills)
    const recommendations = recommendCourses(requiredSkills)

    const doc = await SkillAnalysis.create({
      userId,
      employeeName,
      currentSkills,
      targetRole,
      jobRequirements,
      requiredSkills,
      requiredScored,
      gaps,
      overallScore,
      recommendations,
    })

    res.status(201).json({ analysis: doc.toSafeJSON() })
  } catch (err) {
    next(err)
  }
})

// List analyses for current user
// GET /api/skills
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.sub
    const docs = await SkillAnalysis.find({ userId }).sort({ createdAt: -1 }).limit(50)
    res.json({ analyses: docs.map((d) => d.toSafeJSON()) })
  } catch (err) {
    next(err)
  }
})

// Get single analysis by id (must belong to user)
// GET /api/skills/:id
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.sub
    const { id } = req.params
    const doc = await SkillAnalysis.findOne({ _id: id, userId })
    if (!doc) return res.status(404).json({ error: 'Analysis not found' })
    res.json({ analysis: doc.toSafeJSON() })
  } catch (err) {
    next(err)
  }
})

// Optional: delete an analysis
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.sub
    const { id } = req.params
    const doc = await SkillAnalysis.findOneAndDelete({ _id: id, userId })
    if (!doc) return res.status(404).json({ error: 'Analysis not found' })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router
