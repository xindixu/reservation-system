import { gql } from "apollo-server-express"
import { Team, TeamInput } from "./team.js"

const typeDefs = gql`
  ${Team}
  ${TeamInput}

  type Mutation {
    createTeam(teamInput: TeamInput): Team
  }

  type Query {
    teams: [Team!]
    team: Team
  }
`

export default typeDefs
