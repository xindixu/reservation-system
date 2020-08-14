import { gql } from "apollo-server-express"
import Team from "./team.js"
import Manager from "./manager.js"

const typeDefs = gql`
  ${Team}
  ${Manager}
`

export default typeDefs
