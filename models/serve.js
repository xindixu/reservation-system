import mongoose from "mongoose"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const serviceSchema = new Schema(
  {
    manager: {
      type: ObjectId,
      ref: "Manager",
      required: true,
    },
    client: {
      type: ObjectId,
      ref: "Client",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Service", serviceSchema)
