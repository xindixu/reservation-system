import mongoose from "mongoose"
import { compare } from "bcryptjs"
import { UserInputError } from "apollo-server-express"
import User from "../../models/user.js"
import userValidator from "../../schemas/user.js"
import { createToken, accessTokenAge, refreshTokenAge } from "../../utils/auth.js"

const parseUser = ({ _doc }) => ({
  ..._doc,
})

const me = async (_, __, { req }) => {
  return User.findById(req.userId)
}

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

  const { accessToken, refreshToken } = createToken(user)
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

const invalidateTokens = async (_, __, { req, res }) => {
  if (!req.userId) {
    return false
  }

  const user = await User.findById(req.userId)
  if (!user) {
    return false
  }
  user.lastSeen = Date.now()
  await user.save()
  res.clearCookie("access-token")

  return true
}

export { me, user, users, signUp, signIn, invalidateTokens }
