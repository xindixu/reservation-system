import mongoose from "mongoose"
import { hash } from "bcryptjs"

const { Schema } = mongoose

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await hash(this.password, 10)
    } catch (error) {
      next(error)
    }
  }

  next()
})

export default mongoose.model("User", userSchema)
