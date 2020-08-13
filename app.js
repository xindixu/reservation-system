import express from "express"
import bodyParser from "body-parser"
import { graphqlHTTP } from "express-graphql"
import mongoose from "mongoose"
import graphqlSchema from "./graphql/schema/index.js"
import graphqlResolvers from "./graphql/resolvers/index.js"
import isAuth from "./middleware/is-auth.js"

const app = express()
app.use(bodyParser.json())
app.use(isAuth)
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
)

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@reservation-system.bqumh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => app.listen(3000))
  .catch((err) => console.error(err))
