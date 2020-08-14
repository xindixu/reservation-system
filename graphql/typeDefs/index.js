import { gql } from "apollo-server-express"
import Team from "./team.js"
import Manager from "./manager.js"

const typeDefs = gql`
  ${Team}
  ${Manager}

  type Query {
    welcome: String!
  }

  type Mutation {
    welcomeUser(string: String): String
  }
`

export default typeDefs
