import { isEmpty, identity } from "lodash"
import { checkObjectId } from "../../utils/validators"
import Slot, {
  searchSlots,
  addManagersToSlot,
  removeManagersFromSlot,
  getManagersForSlot,
} from "../../models/slot"
import { getVisitsForSlot } from "../../models/visit"
import { findTeamById } from "../../models/team"
import { areManagerIdsValid } from "../../models/manager"
import { fromCursorHash, toCursorHash } from "../../utils/cursor"

const fetchSlots = async ({ filters = {}, size = 20, next }) => {
  let paginationSettings
  let filterSettings
  if (next) {
    const { name, id } = fromCursorHash(next)
    paginationSettings = {
      $or: [
        { name: { $gte: name } },
        {
          $and: [{ name }, { id: { $gte: id } }],
        },
      ],
    }
  }

  if (!isEmpty(filters)) {
    const { managerIds, teamId, shareable } = filters
    filterSettings = {
      $or: [{ managers: { $in: managerIds } }, { team: teamId }, { shareable }],
    }
  }

  const options = [paginationSettings, filterSettings].filter(identity)

  const slots = await Slot.find(options.length ? { $and: options } : {})
    .sort({ name: 1 })
    .limit(size + 1)

  const hasNext = slots.length > size

  return {
    slots: slots.length > 1 ? slots.slice(0, -1) : slots,
    hasNext,
    next: hasNext ? toCursorHash({ name: slots[slots.length - 1].name }) : "",
  }
}

const resolvers = {
  Query: {
    slot: async (_, { id }) => {
      await checkObjectId(id)
      return Slot.findById(id)
    },

    slots: async (_, { next, size, filters }) => fetchSlots({ next, size, filters }),

    searchSlots: async (_, { q }) => searchSlots(q),
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
