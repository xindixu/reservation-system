import { UserInputError } from "apollo-server-express"
import mongoose from "mongoose"
import mongoosastic from "mongoosastic"
import uniqueValidator from "mongoose-unique-validator"
import { isManagerIdValid, areManagerIdsValid } from "./manager"
import configureSearch, { AUTOCOMPLETE, AUTOCOMPLETE_SEARCH } from "../search/base"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const slotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      es_indexed: true,
      es_analyzer: AUTOCOMPLETE,
      es_search_analyzer: AUTOCOMPLETE_SEARCH,
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
slotSchema.plugin(mongoosastic, {
  hosts: [process.env.ELASTIC_SEARCH],
  bulk: {
    size: 50,
    delay: 100,
  },
})
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

// slot -> managers
export const addManagersToSlot = async (slotId, managerIds) => {
  await areManagerIdsValid(managerIds)
  return Slot.findByIdAndUpdate(
    slotId,
    { $push: { managers: { $each: managerIds } } },
    { new: true }
  )
}
export const removeManagersFromSlot = async (slotId, managerIds) =>
  Slot.findByIdAndUpdate(slotId, { $pullAll: { managers: managerIds } }, { new: true })

export const getManagersForSlot = async (slot) => {
  await slot.populate({ path: "managers" }).execPopulate()
  return slot.managers
}

// manager -> slots
export const addSlotsToManager = async (managerId, slotIds) => {
  await isManagerIdValid(managerId)
  await Slot.updateMany({ _id: { $in: slotIds } }, { $push: { managers: managerId } })
}

export const removeSlotsFromManager = async (mangerId, slotIds) =>
  Slot.updateMany({ _id: { $in: slotIds } }, { $pull: { managers: mangerId } })

export const getSlotsForManager = async (manager) =>
  Slot.where("managers").in(manager.id).sort({ name: 1 })

configureSearch(Slot)

export const searchSlots = async (q) => {
  const result = await Slot.esSearch(
    {
      query: {
        multi_match: {
          query: q,
          analyzer: "standard",
          fuzziness: "AUTO",
          fields: ["name"],
        },
      },
    },
    { hydrate: true }
  )

  const data = result.hits.hits.map((hit) => hit)
  return data
}

export default Slot
