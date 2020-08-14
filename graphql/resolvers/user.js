import mongoose from "mongoose"
import { UserInputError } from "apollo-server-express"
import User from "../../models/user.js"

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
  // if (!isAuth) {
  //   throw new Error("Unauthenticated")
  // }
  const { email, password } = userInput
  const newUser = await new User({
    email,
    password,
  }).save()

  return parseUser(newUser)
}

export { user, users, signUp }
