import { team, teams, createTeam } from "./team.js"
import { manager, managers, createManager } from "./manager.js"

const resolvers = {
  Query: {
    teams,
    team,
    manager,
    managers,
  },
  Mutation: {
    createTeam,
    createManager,
  },
}

export default resolvers
