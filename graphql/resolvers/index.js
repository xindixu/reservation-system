import { team, teams, createTeam } from "./team.js"

const resolvers = {
  Query: {
    teams,
    team,
  },
  Mutation: {
    createTeam,
  },
}

export default resolvers
