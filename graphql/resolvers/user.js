import mongoose from "mongoose"
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import { UserInputError } from "apollo-server-express"
import User from "../../models/user.js"
import userValidator from "../../schemas/user.js"

const accessTokenAge = 60 * 60 * 60 * 2 // 2 hrs
const refreshTokenAge = 60 * 60 * 60 * 24 * 7 // 7 days

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

const me = async (_, args, { req }) => {
  if (!req.userId) {
    return null
  }
  return User.findById(req.userId)
}

const signIn = async (_, { userInput }, { res }) => {
  const { email, password } = userInput

  const user = await User.findOne({
    email,
  })

  if (!user) {
    throw new UserInputError("User doesn't exist")
  }
  const valid = await compare(password, user.password)
  if (!valid) {
    throw new UserInputError("Password is incorrect")
  }
  // TODO: get/store user role

  const accessToken = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_HASH, {
    expiresIn: accessTokenAge,
  })

  const refreshToken = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_HASH, {
    expiresIn: refreshTokenAge,
  })

  res.cookie("access-token", accessToken, { maxAge: accessTokenAge })
  res.cookie("refresh-token", refreshToken, { maxAge: refreshTokenAge })

  return {
    _id: user.id,
    email,
    accessToken,
    refreshToken,
    expiresIn: 1,
  }
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

export { me, user, users, signUp, signIn }
