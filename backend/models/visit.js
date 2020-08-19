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

visitSchema.plugin(uniqueValidator)
const Visit = mongoose.model("Visit", visitSchema)

// slot -> visit
export const getVisitsForSlot = async (slot) =>
  Visit.where("slot").equals(slot.id).sort({ start: 1, end: 1 })

// client -> visit
export const getVisitsForClient = async (client) =>
  Visit.where("client").equals(client.id).sort({ start: 1, end: 1 })

export default Visit
