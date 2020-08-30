import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { hash } from "bcryptjs"
import { ROLES } from "../constants.js"

const { Schema } = mongoose

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastSeen: {
      type: Date,
      required: true,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ROLES,
      default: "ADMIN",
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

userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)
export default User
