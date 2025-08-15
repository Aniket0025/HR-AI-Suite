import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
)

userSchema.methods.toSafeJSON = function () {
  const { _id, name, email, createdAt, updatedAt } = this
  return { id: _id.toString(), name, email, createdAt, updatedAt }
}

export const User = mongoose.model('User', userSchema)
