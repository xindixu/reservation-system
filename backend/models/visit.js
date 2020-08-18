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

export default mongoose.model("Visit", visitSchema)
