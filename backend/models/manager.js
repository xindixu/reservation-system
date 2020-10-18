import { UserInputError } from "apollo-server-express"
import mongoose from "mongoose"
import mongoosastic from "mongoosastic"
import uniqueValidator from "mongoose-unique-validator"
import { phone } from "../utils/validators"
import configureSearch, { AUTOCOMPLETE, AUTOCOMPLETE_SEARCH } from "../search/base"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const managerSchema = new Schema(
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
    jobTitle: {
      type: String,
      required: true,
      es_indexed: true,
      es_analyzer: AUTOCOMPLETE,
      es_search_analyzer: AUTOCOMPLETE_SEARCH,
    },
    team: {
      type: ObjectId,
      ref: "Team",
      required: true,
    },
    // manager
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

managerSchema.plugin(uniqueValidator)
managerSchema.plugin(mongoosastic, {
  hosts: [process.env.ELASTIC_SEARCH],
})

const Manager = mongoose.model("Manager", managerSchema)

export const isManagerIdValid = async (id) => {
  const idFound = await Manager.count({ _id: id })
  if (idFound !== 1) {
    throw new UserInputError(`Manager ${id} not found.`)
  }
  return idFound
}

export const areManagerIdsValid = async (ids) => {
  const idsFound = await Manager.where("_id").in(ids).countDocuments()
  if (idsFound !== ids.length) {
    throw new UserInputError("One or more Managers not found.")
  }
  return idsFound
}

export const getManagerByUserId = async (userId) => Manager.findOne({ user: { $eq: userId } })

export const addManagersToTeam = async (teamId, managerIds) => {
  await Manager.updateMany({ _id: { $in: managerIds } }, { team: teamId })
}

configureSearch(Manager)

export const searchManagers = async (q) => {
  const result = await Manager.esSearch(
    {
      query: {
        multi_match: {
          query: q,
          analyzer: "standard",
          fuzziness: "AUTO",
          fields: ["firstName", "lastName", "jobTitle"],
        },
      },
    },
    { hydrate: true }
  )

  const data = result.hits.hits.map((hit) => hit)
  return data
}
export default Manager
