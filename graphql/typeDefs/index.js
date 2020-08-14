import { gql } from "apollo-server-express"
import Team from "./team.js"
import Manager from "./manager.js"
import User from "./user.js"

const typeDefs = gql`
  ${Team}
  ${Manager}
  ${User}

  type Query {
    welcome: String!
  }

  type Mutation {
    welcomeUser(string: String): String
  }
`

export default typeDefs
