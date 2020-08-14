import mongoose from "mongoose"
import { UserInputError } from "apollo-server-express"
import User from "../../models/user.js"
import userValidator from "../../schemas/user.js"

const parseUser = ({ _doc }) => ({
  ..._doc,
})

const user = async (_, { id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new UserInputError(`${id} is not a valid user id.`)
  }
  return User.findById(id)
}

const users = async () => {
  const allUsers = await User.find()
  return allUsers.map(parseUser)
}

const signUp = async (_, { userInput }) => {
  const { email, password } = userInput
  const { error } = userValidator.validate({ email, password }, { abortEarly: false })

  if (error) {
    throw new UserInputError(error)
  }
  const newUser = await User.create({
    email,
    password,
  })

  return parseUser(newUser)
}

export { user, users, signUp }
