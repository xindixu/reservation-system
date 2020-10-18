import { GraphQLDate, GraphQLDateTime, GraphQLTime } from "graphql-iso-date"
import teamResolvers from "./team"
import managerResolvers from "./manager"
import clientResolvers from "./client"
import slotResolvers from "./slot"
import visitResolvers from "./visit"
import userResolvers from "./user"

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
  visitResolvers,
  userResolvers,
]
