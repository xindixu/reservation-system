import { compare } from "bcryptjs"
import { UserInputError } from "apollo-server-express"
import { checkObjectId } from "../../utils/validators.js"
import User from "../../models/user.js"
import { signUp, signIn } from "../../validators/index.js"
import { createToken, accessTokenAge, refreshTokenAge } from "../../utils/auth.js"

const resolvers = {
  Query: {
    me: async (_, __, { req }) => {
      const { userId } = req
      if (userId) {
        return User.findById(userId)
      }
      return null
    },

    user: async (_, { id }) => {
      await checkObjectId(id)
      return User.findById(id)
    },

    users: async () => User.find(),
  },

  Mutation: {
    signIn: async (_, { input }, { res }) => {
      const { email, password } = input
      const { error } = signIn.validate({ email, password }, { abortEarly: false })
      if (error) {
        throw new UserInputError(error)
      }

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
        id: user.id,
        email,
        accessToken,
        refreshToken,
        expiresIn: 1,
      }
    },

    signUp: async (_, { input }) => {
      const { email, password, role } = input
      const { error } = signUp.validate({ email, password, role }, { abortEarly: false })

      if (error) {
        throw new UserInputError(error)
      }
      return User.create({
        email,
        password,
        role,
      })
    },

    signOut: async (_, __, { req, res }) => {
      const user = await User.findById(req.userId)
      if (!user) {
        return false
      }
      user.lastSeen = Date.now()
      await user.save()
      res.clearCookie("access-token")
      res.clearCookie("refresh-token")
      return true
    },

    invalidateToken: async (_, __, { req, res }) => {
      const user = await User.findById(req.userId)
      if (!user) {
        return false
      }
      user.lastSeen = Date.now()
      await user.save()
      res.clearCookie("access-token")
      return true
    },
  },
}

export default resolvers
