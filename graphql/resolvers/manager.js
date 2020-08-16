import { UserInputError } from "apollo-server-express"
import { checkObjectId } from "../../utils/validators.js"
import Manager from "../../models/manager.js"
import Team from "../../models/team.js"

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

      const team = await Team.findById(teamId)
      if (!team) {
        throw new UserInputError(`Team ${teamId} not found.`)
      }
      const manager = await Manager.create({
        firstName,
        lastName,
        jobTitle,
        email,
        phone,
        team,
      })

      return manager
    },

    updateManager: async (_, { input }) => {
      const { id, teamId, ...updates } = input
      await checkObjectId(id)

      if (teamId) {
        await checkObjectId(teamId)
        const team = await Team.findById(teamId)
        if (!team) {
          throw new UserInputError(`Team ${teamId} not found.`)
        }
      }

      const manager = await Manager.findByIdAndUpdate(
        id,
        { ...updates, team: teamId },
        {
          new: true,
          omitUndefined: true,
        }
      )
      return manager
    },

    deleteManager: async (_, { id }) => {
      await checkObjectId(id)
      const result = await Manager.deleteOne({ _id: id })
      return result.n === 1
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
