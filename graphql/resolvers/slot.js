import { UserInputError } from "apollo-server-express"
import { checkObjectId } from "../../utils/validators.js"
import Slot from "../../models/slot.js"
import Manager from "../../models/manager.js"
import Team from "../../models/team.js"

const resolvers = {
  Query: {
    slot: async (_, { id }) => {
      await checkObjectId(id)
      return Slot.findById(id)
    },
    slots: async () => Slot.find(),
  },

  Mutation: {
    createSlot: async (_, { input }) => {
      const { name, description, shareable, teamId } = input
      const team = await Team.findById(teamId)
      if (!team) {
        throw new UserInputError(`Team ${teamId} not found.`)
      }
      const slot = await Slot.create({
        name,
        description,
        shareable,
        team,
      })

      return slot
    },

    updateSlot: async (_, { input }) => {
      const { id, teamId, ...updates } = input
      await checkObjectId(id)

      if (teamId) {
        await checkObjectId(teamId)
        const team = await Team.findById(teamId)
        if (!team) {
          throw new UserInputError(`Team ${teamId} not found.`)
        }
      }

      const slot = await Slot.findByIdAndUpdate(
        id,
        { ...updates, team: teamId },
        { new: true, omitUndefined: true }
      )
      return slot
    },

    deleteSlot: async (_, { id }) => {
      await checkObjectId(id)
      const result = await Slot.deleteOne({ _id: id })
      return result.n === 1
    },
  },

  Slot: {
    team: async (slot) => {
      await slot.populate({ path: "team" }).execPopulate()
      return slot.team
    },
  },
}

export default resolvers
