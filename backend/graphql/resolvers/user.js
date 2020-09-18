import { compare } from "bcryptjs"
import { checkObjectId } from "../../utils/validators.js"
import User from "../../models/user.js"
import { getManagerByUserId } from "../../models/manager.js"
import { getClientByUserId } from "../../models/client.js"
import { getTeamByUserId } from "../../models/team.js"
import { signUp, signIn } from "../../validators/index.js"
import { createToken, accessTokenAge, refreshTokenAge } from "../../utils/auth.js"

const handleInvalidInputError = (error) =>
  error.details.reduce((memo, { path, message }) => {
    memo[path] = message
    return memo
  }, {})

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
        return handleInvalidInputError(error)
      }

      const user = await User.findOne({
        email,
      })

      if (!user) {
        return {
          email: "Email doesn't exist",
        }
      }
      const valid = await compare(password, user.password)
      if (!valid) {
        return {
          password: "Password is incorrect",
        }
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
        roleType: user.roleType,
        role: user.populate("role"),
      }
    },

    signUp: async (_, { input }, { res }) => {
      const { email, password, roleType } = input
      const { error } = signUp.validate({ email, password, roleType }, { abortEarly: false })

      if (error) {
        return handleInvalidInputError(error)
      }
      try {
        const user = await User.create({
          email,
          password,
          roleType,
        })

        const { accessToken, refreshToken } = createToken(user)
        res.cookie("access-token", accessToken, { maxAge: accessTokenAge })
        res.cookie("refresh-token", refreshToken, { maxAge: refreshTokenAge })
        return {
          id: user.id,
          email,
          roleType,
          accessToken,
          refreshToken,
          expiresIn: 1,
        }
      } catch (e) {
        const { email, password, roleType } = e.errors
        return {
          email: email ? email.message : undefined,
          password: password ? password.message : undefined,
          roleType: roleType ? roleType.message : undefined,
        }
      }
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

  SignUpResult: {
    __resolveType: (obj) => {
      if (obj.id) {
        return "User"
      }
      return "SignUpInvalidInputError"
    },
  },

  SignInResult: {
    __resolveType: (obj) => {
      if (obj.id) {
        return "User"
      }
      return "SignInInvalidInputError"
    },
  },

  User: {
    team: async (user) => getTeamByUserId(user.id),
    manager: async (user) => getManagerByUserId(user.id),
    client: async (user) => getClientByUserId(user.id),
  },
}

export default resolvers
