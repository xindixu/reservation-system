import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import { ApolloServer, AuthenticationError } from "apollo-server-express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import User from "./models/user.js"
import typeDefs from "./graphql/typeDefs/index.js"
import resolvers from "./graphql/resolvers/index.js"
import { createToken, accessTokenAge, refreshTokenAge } from "./utils/auth.js"

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    // const authHeader = req.get("Authorization") || ""
    // const user = getUser(authHeader)
    // if (!user) {
    //   throw new AuthenticationError("you must be logged in")
    // }

    return { req, res }
  },
})

const app = express()
app.use(cookieParser())
app.use(async (req, res, next) => {
  const accessToken = req.cookies["access-token"]
  const refreshToken = req.cookies["refresh-token"]
  if (!accessToken && !refreshToken) {
    return next()
  }

  try {
    const data = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_HASH)
    req.userId = data.userId
    return next()
  } catch (error) {}

  if (!refreshToken) {
    return next()
  }

  let data

  try {
    data = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_HASH)
    req.userId = data.userId
  } catch (error) {}

  const user = await User.findById(data.userId)
  if (!user || user.lastSeen !== data.lastSeen) {
    return next()
  }

  const token = createToken(user)

  res.cookie("access-token", token.accessToken, { maxAge: accessTokenAge })
  res.cookie("refresh-token", token.refreshToken, { maxAge: refreshTokenAge })
  req.userId = user.id

  return next()
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@reservation-system.bqumh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
)

mongoose.connection.once("open", () => console.log("🥭 MongoDB is connected!"))
