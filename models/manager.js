import mongoose from "mongoose"
import { phone } from "../utils/validators.js"

const { Schema } = mongoose

const managerSchema = new Schema({
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
  },
  phone: {
    type: String,
    validate: phone,
  },
  team: { type: Schema.Types.ObjectId, ref: "Team" },
})

export default mongoose.model("Manager", managerSchema)
