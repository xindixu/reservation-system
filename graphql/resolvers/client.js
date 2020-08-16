import { checkObjectId } from "../../utils/validators.js"
import Client from "../../models/client.js"

const resolvers = {
  Query: {
    client: async (_, { id }) => {
      await checkObjectId(id)
      return Client.findById(id)
    },
    clients: async () => {
      return Client.find()
    },
  },

  Mutation: {
    createClient: async (_, { input }) => {
      const { firstName, lastName, email, phone, cycle, duration } = input
      const client = await Client.create({
        firstName,
        lastName,
        email,
        phone,
        cycle,
        duration,
      })

      return client
    },

    updateClient: async (_, { input }) => {
      const { id, ...updates } = input
      await checkObjectId(id)

      const client = await Client.findByIdAndUpdate(id, updates, {
        new: true,
        omitUndefined: true,
      })
      return client
    },

    deleteClient: async (_, { id }) => {
      await checkObjectId(id)
      const result = await Client.deleteOne({ _id: id })
      return result.n === 1
    },
  },
}

export default resolvers
