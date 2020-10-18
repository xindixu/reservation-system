import { UserInputError } from "apollo-server-express"
import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { hash } from "bcryptjs"
import { ADMIN, ROLE_TYPES, LINK_BY_ROLE_TYPE } from "../constants"
import { checkObjectId } from "../utils/validators"

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
    roleType: {
      type: String,
      enum: ROLE_TYPES,
      default: ADMIN,
    },
    locale: {
      type: String,
      default: "en_US",
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

export const findUserById = async (id) => {
  await checkObjectId(id)
  const user = await User.findById(id)
  if (!user) {
    throw new UserInputError(`User ${id} not found.`)
  }
  return user
}

export default User
