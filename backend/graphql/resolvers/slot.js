import { checkObjectId } from "../../utils/validators.js"
import Slot, {
  addManagersToSlot,
  removeManagersFromSlot,
  getManagersForSlot,
} from "../../models/slot.js"
import { getVisitsForSlot } from "../../models/visit.js"
import { findTeamById } from "../../models/team.js"
import { areManagerIdsValid } from "../../models/manager.js"
import { fromCursorHash, toCursorHash } from "../../utils/cursor.js"

const resolvers = {
  Query: {
    slot: async (_, { id }) => {
      await checkObjectId(id)
      return Slot.findById(id)
    },
    slots: async (_, { next, size = 20 }) => {
      let options
      if (next) {
        const { name, id } = fromCursorHash(next)
        options = {
          $or: [
            { name: { $gt: name } },
            {
              $and: [{ name }, { id: { $gt: id } }],
            },
          ],
        }
      }

      const slots = await Slot.find(options)
        .sort({ name: 1 })
        .limit(size + 1)
      const hasNext = slots.length > size

      return {
        slots: slots.slice(0, -1),
        hasNext,
        next: toCursorHash({ name: slots[slots.length - 1].name }),
      }
    },
  },

  Mutation: {
    createSlot: async (_, { input }) => {
      const { name, description, shareable, teamId, managerIds } = input
      const team = await findTeamById(teamId)

      if (managerIds) {
        await areManagerIdsValid(managerIds)
      }

      const slot = await Slot.create({
        name,
        description,
        shareable,
        team,
        managerIds,
      })

      return slot
    },

    updateSlot: async (_, { input }) => {
      const { id, teamId, managerIds, ...updates } = input
      await checkObjectId(id)

      const team = teamId ? await findTeamById(teamId) : undefined
      if (managerIds) {
        await areManagerIdsValid(managerIds)
      }
      const slot = await Slot.findByIdAndUpdate(
        id,
        { ...updates, team, managers: managerIds },
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
