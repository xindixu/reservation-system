import { gql } from "apollo-server-express"

import Team from "./team"
import Manager from "./manager"
import Client from "./client"
import Slot from "./slot"
import Visit from "./visit"
import User from "./user"

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  directive @guest on FIELD_DEFINITION

  scalar Date
  scalar Time
  scalar DateTime

  enum RoleType {
    CLIENT
    MANAGER
    ADMIN
  }

  enum Locale {
    en_US
    zh_CN
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
