import { teamQueries, teamMutations } from "./team.js"
import { managerQueries, managerMutations } from "./manager.js"
import { userQueries, userMutations } from "./user.js"

const resolvers = {
  Query: {
    ...teamQueries,
    ...managerQueries,
    ...userQueries,
  },
  Mutation: {
    ...teamMutations,
    ...managerMutations,
    ...userMutations,
  },
}

export default resolvers
