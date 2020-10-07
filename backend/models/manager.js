import { UserInputError } from "apollo-server-express"
import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { phone } from "../utils/validators.js"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const managerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      validate: phone,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    team: {
      type: ObjectId,
      ref: "Team",
      required: true,
    },
    // manager
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

managerSchema.plugin(uniqueValidator)
const Manager = mongoose.model("Manager", managerSchema)

export const isManagerIdValid = async (id) => {
  const idFound = await Manager.count({ _id: id })
  if (idFound !== 1) {
    throw new UserInputError(`Manager ${id} not found.`)
  }
  return idFound
}

export const areManagerIdsValid = async (ids) => {
  const idsFound = await Manager.where("_id").in(ids).countDocuments()
  if (idsFound !== ids.length) {
    throw new UserInputError("One or more Managers not found.")
  }
  return idsFound
}

export const getManagerByUserId = async (userId) => Manager.findOne({ user: { $eq: userId } })

export const addManagersToTeam = async (teamId, managerIds) => {
  await Manager.updateMany({ _id: { $in: managerIds } }, { team: teamId })
}

export default Manager
