import { UserInputError } from "apollo-server-express"
import { objectId } from "../validators/index.js"

export const validatePhone = (phone) => /\d{10}/.test(phone)

export const phone = {
  validator: validatePhone,
  message: "{VALUE} is not a valid 10 digit phone number.",
}

export const checkObjectId = async (id) => {
  const { error } = await objectId.validate(id)

  if (error) {
    throw new UserInputError(`${id} is not a valid object id.`)
  }
}
