import { isEmpty, identity } from "lodash"
import { checkObjectId } from "../../utils/validators"
import Client, {
  searchClients,
  addManagersToClient,
  removeManagersFromClient,
  getManagersForClient,
} from "../../models/client"
import { findUserById } from "../../models/user"
import { getVisitsForClient, deleteVisitsForClient } from "../../models/visit"
import { areManagerIdsValid } from "../../models/manager"
import { fromCursorHash, toCursorHash } from "../../utils/cursor"

const fetchClients = async ({ filters = {}, size = 20, next }) => {
  let paginationSettings
  let filterSettings
  if (next) {
    const { firstName, lastName, id } = fromCursorHash(next)
    paginationSettings = {
      $or: [
        { firstName: { $gte: firstName } },
        {
          $and: [{ firstName }, { lastName: { $gte: lastName } }],
        },
        {
          $and: [{ firstName }, { lastName }, { id: { $gte: id } }],
        },
      ],
    }
  }

  if (!isEmpty(filters)) {
    const { managerIds } = filters
    filterSettings = {
      $or: [{ managers: { $in: managerIds } }],
    }
  }

  const options = [paginationSettings, filterSettings].filter(identity)

  const clients = await Client.find(options.length ? { $and: options } : {})
    .sort({ firstName: 1, lastName: 1, id: 1 })
    .limit(size + 1)

  const hasNext = clients.length > size

  return {
    clients: clients.length > 1 ? clients.slice(0, -1) : clients,
    hasNext,
    next: hasNext ? toCursorHash({ firstName: clients[clients.length - 1].firstName }) : "",
  }
}

const resolvers = {
  Query: {
    client: async (_, { id }) => {
      await checkObjectId(id)
      return Client.findById(id)
    },

    clients: async (_, { next, size, filters }) => fetchClients({ next, size, filters }),

    allClients: async () => Client.find().sort({ firstName: 1, lastName: 1, id: 1 }),

    searchClients: async (_, { q }) => searchClients(q),
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
