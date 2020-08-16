import mongoose from "mongoose"
import { UserInputError } from "apollo-server-express"
import Team from "../../models/team.js"

const resolvers = {
  Query: {
    team: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid manager id.`)
      }
      return Team.findById(id)
    },
    teams: async () => Team.find(),
  },

  Mutation: {
    createTeam: async (_, { input }) => {
      const { name, description, email, phone } = input
      const team = await new Team({
        name,
        description,
        email,
        phone,
      }).save()

      return team
    },
  },

  Team: {
    managers: async (team) => {
      await team.populate("managers").execPopulate()
      return team.managers
    },
  },
}

export default resolvers
