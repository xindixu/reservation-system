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
    managers: [
      {
        type: ObjectId,
        ref: "Manager",
      },
    ],
    team: {
      type: ObjectId,
      ref: "Team",
      required: true,
    },
  },
  { timestamps: true }
)

slotSchema.plugin(uniqueValidator)

export default mongoose.model("Slot", slotSchema)
