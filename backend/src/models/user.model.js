import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    // Profile fields
    title: { type: String, trim: true },
    bio: { type: String, trim: true, maxlength: 2000 },
    location: { type: String, trim: true },
    experienceYears: { type: Number, min: 0, max: 60 },
    department: { type: String, trim: true },
    reportsTo: { type: String, trim: true },
    skills: { type: [String], default: [] },
    badges: { type: [String], default: [] },
    links: {
      linkedin: { type: String, trim: true },
      slack: { type: String, trim: true },
      website: { type: String, trim: true },
    },
  },
  { timestamps: true }
)

userSchema.methods.toSafeJSON = function () {
  const {
    _id,
    name,
    email,
    title,
    bio,
    location,
    experienceYears,
    department,
    reportsTo,
    skills,
    badges,
    links,
    createdAt,
    updatedAt,
  } = this
  return {
    id: _id.toString(),
    name,
    email,
    title,
    bio,
    location,
    experienceYears,
    department,
    reportsTo,
    skills,
    badges,
    links,
    createdAt,
    updatedAt,
  }
}

export const User = mongoose.model('User', userSchema)
