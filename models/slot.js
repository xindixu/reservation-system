import { UserInputError } from "apollo-server-express"
import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const slotSchema = new Schema(
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
    shareable: {
      type: Boolean,
      required: true,
    },
    team: {
      type: ObjectId,
      ref: "Team",
      required: true,
    },
    managers: [
      {
        type: ObjectId,
        ref: "Manager",
      },
    ],
  },
  { timestamps: true }
)

slotSchema.plugin(uniqueValidator)

const Slot = mongoose.model("Slot", slotSchema)

export const findSlotById = async (id) => {
  const slot = await Slot.findById(id)
  if (!slot) {
    throw new UserInputError(`Slot ${id} not found.`)
  }
  return slot
}

export const areSlotIdsValid = async (ids) => {
  const idsFound = await Slot.where("_id").in(ids).countDocuments()
  if (idsFound !== ids.length) {
    throw new UserInputError("One or more Slot not found.")
  }
  return idsFound
}

export default Slot
