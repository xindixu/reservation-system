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

export default mongoose.model("Manager", managerSchema)
