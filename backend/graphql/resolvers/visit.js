import { checkObjectId } from "../../utils/validators"
import Visit, { getVisitsInRange } from "../../models/visit"
import { findSlotById } from "../../models/slot"
import Client, { findClientById } from "../../models/client"

const sortOptions = { start: 1, end: 1, _id: 1 }
const resolvers = {
  Query: {
    visit: async (_, { id }) => {
      await checkObjectId(id)
      return Visit.findById(id)
    },
    visits: async () => Visit.find().sort(sortOptions),

    visitsInRange: async (_, { from, to }) => getVisitsInRange(from, to),

    searchVisits: async (_, { clientIds, managerIds, slotIds }) => {
      const clientForManagers = managerIds
        ? await Client.find({ managers: { $in: managerIds } }, { _id: 1 })
        : []
      const allClientIds = [...clientForManagers.map(({ _id }) => _id), ...clientIds]
      const visits = await Visit.find({
        $or: [{ client: { $in: allClientIds } }, { slot: { $in: slotIds } }],
      }).sort(sortOptions)

      return visits
    },
  },

  Mutation: {
    createVisit: async (_, { input }) => {
      const { start, end, clientId, slotId } = input
      const client = await findClientById(clientId)
      const slot = await findSlotById(slotId)
      const visit = await Visit.create({
        start,
        end,
        client,
        slot,
      })

      return visit
    },

    updateVisit: async (_, { input }) => {
      const { id, clientId, slotId, ...updates } = input
      await checkObjectId(id)

      const client = clientId ? await findClientById(clientId) : undefined
      const slot = slotId ? await findSlotById(slotId) : undefined

      const visit = await Visit.findByIdAndUpdate(
        id,
        { ...updates, client, slot },
        { new: true, omitUndefined: true }
      )
      return visit
    },

    destroyVisit: async (_, { id }) => {
      await checkObjectId(id)
      const result = await Visit.deleteOne({ _id: id })
      return result.n === 1 ? id : null
    },
  },

  Visit: {
    client: async (visit) => {
      await visit.populate({ path: "client" }).execPopulate()
      return visit.client
    },

    slot: async (visit) => {
      await visit.populate({ path: "slot" }).execPopulate()
      return visit.slot
    },
  },
}

export default resolvers
