import { checkObjectId } from "../../utils/validators.js"
import Manager from "../../models/manager.js"
import { findTeamById } from "../../models/team.js"

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
      const team = await findTeamById(teamId)
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

      const team = teamId ? await findTeamById(teamId) : undefined
      const manager = await Manager.findByIdAndUpdate(
        id,
        { ...updates, team },
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
