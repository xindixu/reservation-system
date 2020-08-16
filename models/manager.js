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
    team: {
      type: ObjectId,
      ref: "Team",
      required: true,
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

export default Manager
