import mongoose from "mongoose"
import { UserInputError } from "apollo-server-express"
import Manager from "../../models/manager.js"
import Team from "../../models/team.js"

const parseManager = ({ _doc }) => ({
  ..._doc,
  id: _doc._id,
})

const resolvers = {
  Query: {
    manager: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid manager id.`)
      }
      return Manager.findById(id)
    },
    managers: async () => {
      return Manager.find()
    },
  },

  Mutation: {
    createManager: async (_, { input }) => {
      const { firstName, lastName, jobTitle, email, phone, teamId } = input
      const team = await Team.findOne({ _id: teamId })
      if (!team) {
        throw new UserInputError(`${teamId} is not a valid team id.`)
      }
      const newManager = await new Manager({
        firstName,
        lastName,
        jobTitle,
        email,
        phone,
        team,
      }).save()

      team.managers.push(newManager)
      await team.save()
      return parseManager(newManager)
    },
  },

  Manager: {
    team: async (manager) => {
      await manager.populate({ path: "team" }).execPopulate()
      return manager.team
    },
  },
}

export default resolvers
