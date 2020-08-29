import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const visitSchema = new Schema(
  {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    client: {
      type: ObjectId,
      ref: "Client",
      required: true,
    },
    slot: {
      type: ObjectId,
      ref: "Slot",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
const sortOptions = { start: 1, end: 1, _id: 1 }

visitSchema.plugin(uniqueValidator)
const Visit = mongoose.model("Visit", visitSchema)

export const getVisitsInRange = async (from, to) =>
  Visit.find({
    $or: [
      { start: { $gte: from, $lte: to } },
      { end: { $gte: from, $lte: to } },
      { $and: [{ start: { $lte: from } }, { end: { $gte: to } }] },
    ],
  }).sort(sortOptions)

// slot -> visit
export const getVisitsForSlot = async (slot) =>
  Visit.where("slot").equals(slot.id).sort(sortOptions)

// client -> visit
export const getVisitsForClient = async (client) =>
  Visit.where("client").equals(client.id).sort(sortOptions)

export const deleteVisitsForClient = async (client) => Visit.deleteMany({ client })

export default Visit
