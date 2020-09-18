import { checkObjectId } from "../../utils/validators.js"
import Client, {
  addManagersToClient,
  removeManagersFromClient,
  getManagersForClient,
} from "../../models/client.js"
import { findUserById } from "../../models/user.js"
import { getVisitsForClient, deleteVisitsForClient } from "../../models/visit.js"
import { areManagerIdsValid } from "../../models/manager.js"
import { fromCursorHash, toCursorHash } from "../../utils/cursor.js"

const resolvers = {
  Query: {
    client: async (_, { id }) => {
      await checkObjectId(id)
      return Client.findById(id)
    },

    clients: async (_, { next, size = 20 }) => {
      let options
      if (next) {
        const { firstName, lastName, id } = fromCursorHash(next)
        options = {
          $or: [
            { firstName: { $gt: firstName } },
            {
              $and: [{ firstName }, { lastName: { $gt: lastName } }],
            },
            {
              $and: [{ firstName }, { lastName }, { id: { $gt: id } }],
            },
          ],
        }
      }

      const clients = await Client.find(options)
        .sort({ firstName: 1, lastName: 1, id: 1 })
        .limit(size + 1)
      const hasNext = clients.length > size

      return {
        clients: clients.slice(0, -1),
        hasNext,
        next: toCursorHash({ firstName: clients[clients.length - 1].firstName }),
      }
    },
  },

  Mutation: {
    createClient: async (_, { input }) => {
      const { firstName, lastName, email, phone, cycle, duration, userId, managerIds } = input

      if (managerIds) {
        await areManagerIdsValid(managerIds)
      }

      const user = userId ? await findUserById(userId) : undefined

      const client = await Client.create({
        firstName,
        lastName,
        email,
        phone,
        cycle,
        duration,
        managers: managerIds,
        user,
      })

      return client
    },

    updateClient: async (_, { input }) => {
      const { id, managerIds, userId, ...updates } = input
      await checkObjectId(id)

      if (managerIds) {
        await areManagerIdsValid(managerIds)
      }

      const user = userId ? await findUserById(userId) : undefined

      const client = await Client.findByIdAndUpdate(
        id,
        { managers: managerIds, user, ...updates },
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
      await deleteVisitsForClient(id)
      return result.n === 1 ? id : null
    },

    // addManagersToClient: async (_, { id, managerIds }) => addManagersToClient(id, managerIds),

    // removeManagersFromClient: async (_, { id, managerIds }) =>
    //   removeManagersFromClient(id, managerIds),
  },

  Client: {
    managers: async (client) => getManagersForClient(client),

    visits: async (client) => getVisitsForClient(client),

    user: async (client) => {
      await client.populate({ path: "user" }).execPopulate()
      return client.user
    },
  },
}

export default resolvers
