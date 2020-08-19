import { checkObjectId } from "../../utils/validators.js"
import Client, {
  addManagersToClient,
  removeManagersFromClient,
  getManagersForClient,
} from "../../models/client.js"
import { getVisitsForClient } from "../../models/visit.js"
import { areManagerIdsValid } from "../../models/manager.js"

const resolvers = {
  Query: {
    client: async (_, { id }) => {
      await checkObjectId(id)
      return Client.findById(id)
    },
    clients: async () => {
      return Client.find().sort({ firstName: 1, lastName: 1 })
    },
  },

  Mutation: {
    createClient: async (_, { input }) => {
      const { firstName, lastName, email, phone, cycle, duration, managerIds } = input

      if (managerIds) {
        await areManagerIdsValid(managerIds)
      }

      const client = await Client.create({
        firstName,
        lastName,
        email,
        phone,
        cycle,
        duration,
        managerIds,
      })

      return client
    },

    updateClient: async (_, { input }) => {
      const { id, managerIds, ...updates } = input
      await checkObjectId(id)

      if (managerIds) {
        await areManagerIdsValid(managerIds)
      }

      const client = await Client.findByIdAndUpdate(
        id,
        { managers: managerIds, ...updates },
        {
          new: true,
          omitUndefined: true,
        }
      )
      return client
    },

    destroyClient: async (_, { id }) => {
      await checkObjectId(id)
      const result = await Client.deleteOne({ _id: id })
      return result.n === 1 ? id : null
    },

    // addManagersToClient: async (_, { id, managerIds }) => addManagersToClient(id, managerIds),

    // removeManagersFromClient: async (_, { id, managerIds }) =>
    //   removeManagersFromClient(id, managerIds),
  },

  Client: {
    managers: async (client) => getManagersForClient(client),

    visits: async (client) => getVisitsForClient(client),
  },
}

export default resolvers
