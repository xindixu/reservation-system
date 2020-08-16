import { UserInputError } from "apollo-server-express"
import { checkObjectId } from "../../utils/validators.js"
import Manager from "../../models/manager.js"
import Team from "../../models/team.js"

const parseManager = ({ _doc }) => ({
  ..._doc,
  id: _doc._id,
})

const resolvers = {
  Query: {
    manager: async (_, { id }) => {
      await checkObjectId(id)
      return Manager.findById(id)
    },
    managers: async () => {
      return Manager.find()
    },
  },

  Mutation: {
    createManager: async (_, { input }) => {
      const { firstName, lastName, jobTitle, email, phone, teamId } = input
      await checkObjectId(teamId)

      const team = await Team.findOne({ _id: teamId })
      if (!team) {
        throw new UserInputError(`Team ${teamId} not found.`)
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

    updateManager: async (_, { input }) => {
      const { id, teamId, ...updates } = input
      await checkObjectId(teamId)
      const manager = await Manager.findByIdAndUpdate(id, updates, { new: true })
      return manager
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
