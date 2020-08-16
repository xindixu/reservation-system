import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { phone } from "../utils/validators.js"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const teamSchema = new Schema(
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
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      validate: phone,
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

teamSchema.plugin(uniqueValidator)

export default mongoose.model("Team", teamSchema)
