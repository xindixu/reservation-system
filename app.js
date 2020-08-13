import express from "express"
import bodyParser from "body-parser"
import { ApolloServer, gql } from "apollo-server-express"
import mongoose from "mongoose"
import typeDefs from "./graphql/schema/index.js"
import resolvers from "./graphql/resolvers/index.js"

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@reservation-system.bqumh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
)

mongoose.connection.once("open", () => console.log("🥭 MongoDB is connected!"))
