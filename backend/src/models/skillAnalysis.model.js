import mongoose from 'mongoose'

const gapSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
    proficiency: { type: Number, min: 0, max: 100, default: 0 },
    required: { type: Number, min: 0, max: 100, default: 60 },
  },
  { _id: false }
)

const scoredSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    weight: { type: Number, required: true },
  },
  { _id: false }
)

const recommendationSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    course: { type: String, required: true },
    provider: { type: String },
    duration: { type: String },
    url: { type: String },
  },
  { _id: false }
)

const skillAnalysisSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    employeeName: { type: String, trim: true },
    currentSkills: { type: [String], default: [] },
    targetRole: { type: String, trim: true },
    jobRequirements: { type: String, trim: true },

    requiredSkills: { type: [String], default: [] },
    requiredScored: { type: [scoredSchema], default: [] },
    gaps: { type: [gapSchema], default: [] },

    overallScore: { type: Number, min: 0, max: 100, default: 0 },
    recommendations: { type: [recommendationSchema], default: [] },
  },
  { timestamps: true }
)

skillAnalysisSchema.methods.toSafeJSON = function () {
  return {
    id: this._id.toString(),
    userId: this.userId?.toString?.() || this.userId,
    employeeName: this.employeeName,
    currentSkills: this.currentSkills,
    targetRole: this.targetRole,
    jobRequirements: this.jobRequirements,
    requiredSkills: this.requiredSkills,
    requiredScored: this.requiredScored,
    gaps: this.gaps,
    overallScore: this.overallScore,
    recommendations: this.recommendations,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  }
}

const SkillAnalysis = mongoose.model('SkillAnalysis', skillAnalysisSchema)
export default SkillAnalysis
