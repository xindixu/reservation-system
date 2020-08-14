import { team, teams, createTeam } from "./team.js"
import { manager, managers, createManager } from "./manager.js"
import { user, users, signUp } from "./user.js"

const resolvers = {
  Query: {
    teams,
    team,
    manager,
    managers,
    user,
    users,
  },
  Mutation: {
    createTeam,
    createManager,
    signUp,
  },
}

export default resolvers
