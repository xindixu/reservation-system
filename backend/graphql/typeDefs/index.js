import { gql } from "apollo-server-express"

import Team from "./team.js"
import Manager from "./manager.js"
import Client from "./client.js"
import Slot from "./slot.js"
import Visit from "./visit.js"
import User from "./user.js"

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  directive @guest on FIELD_DEFINITION

  scalar Date
  scalar Time
  scalar DateTime

  enum Role {
    CLIENT
    MANAGER
    ADMIN
  }

  ${Team}
  ${Manager}
  ${Client}
  ${Slot}
  ${Visit}
  ${User}

  type Query {
    _: String!
  }

  type Mutation {
    _: String
  }
`

export default typeDefs
