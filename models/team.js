import mongoose from "mongoose"

const { Schema } = mongoose

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
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
    validate: {
      validator(v) {
        return /\d{10}/.test(v)
      },
      message: "{VALUE} is not a valid 10 digit phone number.",
    },
  },
})

export default mongoose.model("Team", teamSchema)
