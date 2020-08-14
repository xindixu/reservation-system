import { gql } from "apollo-server-express"
import Team from "./team.js"
import Manager from "./manager.js"

const typeDefs = gql`
  ${Team}

  ${Manager}
  ${ManagerInput}

  type Mutation {
    createManager(managerInput: ManagerInput): Manager
  }

  type Query {
    managers: [Manager!]
    manager(id: ID!): Manager!
  }
`

export default typeDefs
