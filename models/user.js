import mongoose from "mongoose"
import { hash } from "bcryptjs"

const { Schema } = mongoose

const userSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: async (email) => User.doesntExist({ email }),
        message: ({ value }) => `Email ${value} has already been taken!`,
      },
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
    this.password = await hash(this.password, 10)
  }

  next()
})

userSchema.statics.doesntExist = async function (options) {
  return (await this.where(options).countDocuments()) === 0
}

const User = mongoose.model("User", userSchema)
export default User
