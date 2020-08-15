import { team, teams, createTeam } from "./team.js"
import { manager, managers, createManager } from "./manager.js"
import { me, user, users, signIn, signUp } from "./user.js"

const resolvers = {
  Query: {
    teams,
    team,
    manager,
    managers,
    user,
    users,
    me,
  },
  Mutation: {
    createTeam,
    createManager,
    signIn,
    signUp,
  },
}

export default resolvers
