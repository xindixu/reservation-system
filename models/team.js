import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { phone } from "../utils/validators.js"

const { Schema } = mongoose

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
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
  managers: [{ type: Schema.Types.ObjectId, ref: "Manager" }],
})

teamSchema.plugin(uniqueValidator)

export default mongoose.model("Team", teamSchema)
