import { UserInputError } from "apollo-server-express"
import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { isManagerIdValid, areManagerIdsValid } from "./manager.js"

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

export const addManagersToSlot = async (slotId, managerIds) => {
  await areManagerIdsValid(managerIds)
  return Slot.findByIdAndUpdate(
    slotId,
    { $push: { managers: { $each: managerIds } } },
    { new: true }
  )
}

export const addSlotsToManager = async (managerId, slotIds) => {
  await isManagerIdValid(managerId)
  await Slot.updateMany({ _id: { $in: slotIds } }, { $push: { managers: managerId } })
}

export const removeManagersFromSlot = async (slotId, managerIds) =>
  Slot.findByIdAndUpdate(slotId, { $pullAll: { managers: managerIds } }, { new: true })

export const removeSlotsFromManager = async (mangerId, slotsIds) =>
  Slot.updateMany({ _id: { $in: slotsIds } }, { $pull: { managers: mangerId } })

export const getManagersForSlot = async (slot) => {
  await slot.populate({ path: "managers" }).execPopulate()
  return slot.managers
}

export const getSlotsForManager = async (manager) => Slot.where("managers").in(manager.id)

export default Slot
