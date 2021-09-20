import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import { ApolloServer } from "apollo-server-express"
import { makeExecutableSchema } from "@graphql-tools/schema"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import User from "./models/user"
import typeDefs from "./graphql/typeDefs/index"
import resolvers from "./graphql/resolvers/index"
import { createToken, accessTokenAge, refreshTokenAge } from "./utils/auth"
import { authDirectiveTransformer, guestDirectiveTransformer } from "./graphql/directives/index"

const corsOptions = {
  origin: "http://localhost:5000",
  credentials: true,
}

async function start() {
  // express
  // user authentication
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

  // apollo graphql
  let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })
  schema = authDirectiveTransformer(schema, "auth")
  schema = guestDirectiveTransformer(schema, "guest")

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    schema,
    context: ({ req, res }) => ({ req, res }),
  })

  await server.start()
  server.applyMiddleware({ app, cors: corsOptions })

  // start process
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )

  app.use(express.static(path.join(__dirname, "build")))
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
  })

  // connect mongoDB
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@reservation-system.bqumh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )

  mongoose.connection.once("open", () => console.log("🥭 MongoDB is connected!"))
}

start().catch((err) => console.log(err))
