import { teams, createTeam } from "./team.js"

const resolvers = {
  Query: {
    teams,
    team: (id) => {},
  },
  Mutation: {
    createTeam,
  },
}

export default resolvers
