import util from "util"
import { UserInputError } from "apollo-server-express"
import mongoose from "mongoose"
import mongoosastic from "mongoosastic"
import uniqueValidator from "mongoose-unique-validator"
import { phone } from "../utils/validators.js"

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const managerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      es_indexed: true,
      es_analyzer: "autocomplete",
      es_search_analyzer: "autocomplete_search",
    },
    lastName: {
      type: String,
      required: true,
      es_indexed: true,
      es_analyzer: "autocomplete",
      es_search_analyzer: "autocomplete_search",
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
      es_analyzer: "autocomplete",
      es_search_analyzer: "autocomplete_search",
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

Manager.createMapping(
  {
    settings: {
      analysis: {
        analyzer: {
          autocomplete: {
            tokenizer: "autocomplete",
            filter: ["lowercase"],
          },
          autocomplete_search: {
            tokenizer: "lowercase",
          },
        },
        tokenizer: {
          autocomplete: {
            type: "edge_ngram",
            min_gram: 2,
            max_gram: 10,
            token_chars: ["letter"],
          },
        },
      },
    },
  },
  (err, mapping) => {
    if (err) {
      console.log("err", err)
    } else {
      console.log("success", mapping)
    }
  }
)

let count = 0
const stream = Manager.synchronize()
stream.on("data", () => {
  count++
})

stream.on("close", () => {
  console.log(`Indexed ${count} documents.`)
})

stream.on("error", (err) => {
  console.log(err)
})

Manager.search = util.promisify(Manager.search, { context: Manager })
Manager.esSearch = util.promisify(Manager.esSearch, { context: Manager })
export default Manager
