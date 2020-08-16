import { UserInputError } from "apollo-server-express"
import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { phone } from "../utils/validators.js"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const clientSchema = new Schema(
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
    cycle: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
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

clientSchema.plugin(uniqueValidator)

const Client = mongoose.model("Client", clientSchema)

export const findClientById = async (id) => {
  const client = await Client.findById(id)
  if (!client) {
    throw new UserInputError(`Client ${id} not found.`)
  }
  return client
}

export default Client
