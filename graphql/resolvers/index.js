import { GraphQLDate, GraphQLDateTime, GraphQLTime } from "graphql-iso-date"
import teamResolvers from "./team.js"
import managerResolvers from "./manager.js"
import clientResolvers from "./client.js"
import slotResolvers from "./slot.js"
import userResolvers from "./user.js"

const utils = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Time: GraphQLTime,
}

export default [
  utils,
  teamResolvers,
  managerResolvers,
  clientResolvers,
  slotResolvers,
  userResolvers,
]
