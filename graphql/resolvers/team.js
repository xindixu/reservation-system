import { UserInputError } from "apollo-server-express"
import { checkObjectId } from "../../utils/validators.js"
import Team from "../../models/team.js"
import Manager from "../../models/manager.js"
import Slot from "../../models/slot.js"

const resolvers = {
  Query: {
    team: async (_, { id }) => {
      await checkObjectId(id)
      return Team.findById(id)
    },
    teams: async () => Team.find(),
  },

  Mutation: {
    createTeam: async (_, { input }) => {
      const { name, description, email, phone } = input
      const team = await Team.create({
        name,
        description,
        email,
        phone,
      })
      return team
    },

    updateTeam: async (_, { input }) => {
      const { id, managerIds, slotIds, ...updates } = input
      await checkObjectId(id)

      if (managerIds) {
        const managerIdsFound = await Manager.where("_id").in(managerIds).countDocuments()
        if (managerIdsFound !== managerIds.length) {
          throw new UserInputError("One or more Managers not found")
        }
        await Manager.updateMany({ _id: { $in: managerIds } }, { team: id })
      }

      if (slotIds) {
        const slotIdsFound = await Slot.where("_id").in(slotIds).countDocuments()
        if (slotIdsFound !== slotIds.length) {
          throw new UserInputError("One or more Slots not found")
        }
        await Slot.updateMany({ _id: { $in: slotIds } }, { team: id })
      }

      const team = await Team.findByIdAndUpdate(id, updates, { new: true })
      return team
    },

    deleteTeam: async (_, { id }) => {
      await checkObjectId(id)
      const result = await Team.deleteOne({ _id: id })
      // delete dependent managers and slots
      await Manager.deleteMany({ team: id })
      await Slot.deleteMany({ team: id })
      return result.n === 1
    },
  },

  Team: {
    managers: async (team) => {
      const managers = await Manager.where("team").equals(team.id)
      return managers
    },

    slots: async (team) => {
      const slots = await Slot.where("team").equals(team.id)
      return slots
    },
  },
}

export default resolvers
