import { UserInputError } from "apollo-server-express"
import mongoose from "mongoose"
import mongoosastic from "mongoosastic"
import uniqueValidator from "mongoose-unique-validator"
import { compact } from "lodash"
import { phone } from "../utils/validators"
import { isManagerIdValid, areManagerIdsValid } from "./manager"
import configureSearch, { AUTOCOMPLETE, AUTOCOMPLETE_SEARCH } from "../search/base"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const clientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      es_indexed: true,
      es_analyzer: AUTOCOMPLETE,
      es_search_analyzer: AUTOCOMPLETE_SEARCH,
    },
    lastName: {
      type: String,
      required: true,
      es_indexed: true,
      es_analyzer: AUTOCOMPLETE,
      es_search_analyzer: AUTOCOMPLETE_SEARCH,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      validate: phone,
    },
    cycle: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    // client
    user: {
      type: ObjectId,
      ref: "User",
    },
    managers: [
      {
        type: ObjectId,
        ref: "Manager",
      },
    ],
  },
  { timestamps: true }
)

clientSchema.plugin(uniqueValidator)
clientSchema.plugin(mongoosastic, {
  hosts: [process.env.ELASTIC_SEARCH],
  ssl: { rejectUnauthorized: false },
  bulk: {
    size: 50,
    delay: 1000,
  },
})

const Client = mongoose.model("Client", clientSchema)

export const findClientById = async (id) => {
  const client = await Client.findById(id)
  if (!client) {
    throw new UserInputError(`Client ${id} not found.`)
  }
  return client
}

// client -> managers
export const addManagersToClient = async (clientId, managerIds) => {
  await areManagerIdsValid(managerIds)
  return Client.findByIdAndUpdate(
    clientId,
    { $push: { managers: { $each: managerIds } } },
    { new: true }
  )
}
export const removeManagersFromClient = async (clientId, managerIds) =>
  Client.findByIdAndUpdate(clientId, { $pullAll: { managers: managerIds } }, { new: true })

export const getManagersForClient = async (client) => {
  await client.populate({ path: "managers" }).execPopulate()
  return client.managers
}

// manager -> clients
export const addClientsToManager = async (managerId, clientIds) => {
  await isManagerIdValid(managerId)
  await Client.updateMany({ _id: { $in: clientIds } }, { $push: { managers: managerId } })
}

export const removeClientsFromManager = async (mangerId, clientIds) =>
  Client.updateMany({ _id: { $in: clientIds } }, { $pull: { managers: mangerId } })

export const getClientsForManager = async (manager) =>
  Client.find({ managers: { $elemMatch: { $eq: manager.id } } }).sort({ firstName: 1, lastName: 1 })

export const getClientsCountForManager = async (manager) =>
  Client.countDocuments({ managers: { $elemMatch: { $eq: manager.id } } })

export const getClientByUserId = async (userId) => Client.findOne({ user: { $eq: userId } })

configureSearch(Client)

export const searchClients = async (q) => {
  const result = await Client.esSearch(
    {
      query: {
        multi_match: {
          query: q,
          analyzer: "standard",
          fuzziness: "AUTO",
          fields: ["firstName", "lastName"],
        },
      },
    },
    { hydrate: true }
  )

  const data = result.hits.hits.map((hit) => hit)
  return compact(data)
}

export default Client
