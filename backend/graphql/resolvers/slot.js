import { checkObjectId } from "../../utils/validators.js"
import Slot, {
  addManagersToSlot,
  removeManagersFromSlot,
  getManagersForSlot,
} from "../../models/slot.js"
import { getVisitsForSlot } from "../../models/visit.js"
import { findTeamById } from "../../models/team.js"

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
      const team = await findTeamById(teamId)
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

      const team = teamId ? await findTeamById(teamId) : undefined
      const slot = await Slot.findByIdAndUpdate(
        id,
        { ...updates, team },
        { new: true, omitUndefined: true }
      )
      return slot
    },

    destroySlot: async (_, { id }) => {
      await checkObjectId(id)
      const result = await Slot.deleteOne({ _id: id })
      return result.n === 1 ? id : null
    },

    addManagersToSlot: async (_, { id, managerIds }) => addManagersToSlot(id, managerIds),

    removeManagersFromSlot: async (_, { id, managerIds }) => removeManagersFromSlot(id, managerIds),
  },

  Slot: {
    team: async (slot) => {
      await slot.populate({ path: "team" }).execPopulate()
      return slot.team
    },

    managers: async (slot) => getManagersForSlot(slot),

    visits: async (slot) => getVisitsForSlot(slot),
  },
}

export default resolvers
