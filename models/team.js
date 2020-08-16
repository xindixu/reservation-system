import { UserInputError } from "apollo-server-express"
import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { checkObjectId, phone } from "../utils/validators.js"

const { Schema } = mongoose

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      validate: phone,
    },
  },
  { timestamps: true }
)

teamSchema.plugin(uniqueValidator)

const Team = mongoose.model("Team", teamSchema)

export const findTeamById = async (id) => {
  await checkObjectId(id)
  const team = await Team.findById(id)
  if (!team) {
    throw new UserInputError(`Team ${id} not found.`)
  }
  return team
}

export default Team
