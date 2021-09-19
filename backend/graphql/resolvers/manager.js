import { identity } from "lodash"
import { checkObjectId } from "../../utils/validators"
import Manager, { searchManagers } from "../../models/manager"
import { findTeamById } from "../../models/team"
import { findUserById } from "../../models/user"
import { getSlotsForManager, addSlotsToManager, removeSlotsFromManager } from "../../models/slot"
import {
  getClientsCountForManager,
  getClientsForManager,
  addClientsToManager,
  removeClientsFromManager,
} from "../../models/client"
import { fromCursorHash, toCursorHash } from "../../utils/cursor"

const fetchManagers = async ({ size = 20, next }) => {
  let paginationSettings
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

  const options = [paginationSettings].filter(identity)

  const managers = await Manager.find(options.length ? { $and: options } : {})
    .sort({ firstName: 1, lastName: 1, id: 1 })
    .limit(size + 1)

  const hasNext = managers.length > size

  return {
    managers: managers.length > 1 ? managers.slice(0, -1) : managers,
    hasNext,
    next: hasNext ? toCursorHash({ firstName: managers[managers.length - 1].firstName }) : "",
  }
}

const resolvers = {
  Query: {
    manager: async (_, { id }) => {
      await checkObjectId(id)
      return Manager.findById(id)
    },

    managers: async (_, { next, size }) => fetchManagers({ next, size }),

    allManagers: async () => Manager.find().sort({ firstName: 1, lastName: 1, id: 1 }),

    searchManagers: async (_, { q }) => searchManagers(q),
  },

  Mutation: {
    createManager: async (_, { input }) => {
      const { firstName, lastName, jobTitle, email, phone, userId, teamId } = input
      const team = await findTeamById(teamId)
      const user = await findUserById(userId)
      const manager = await Manager.create({
        firstName,
        lastName,
        jobTitle,
        email,
        phone,
        team,
        user,
      })

      return manager
    },

    updateManager: async (_, { input }) => {
      const { id, teamId, userId, ...updates } = input
      await checkObjectId(id)

      const team = teamId ? await findTeamById(teamId) : undefined
      const user = userId ? await findUserById(userId) : undefined

      const manager = await Manager.findByIdAndUpdate(
        id,
        { ...updates, team, user },
        {
          new: true,
          omitUndefined: true,
        }
      )
      return manager
    },

    destroyManager: async (_, { id }) => {
      await checkObjectId(id)
      const result = await Manager.deleteOne({ _id: id })
      return result.n === 1 ? id : null
    },

    addSlotsToManager: async (_, { id, slotIds }) => {
      await addSlotsToManager(id, slotIds)
      return Manager.findById(id)
    },

    removeSlotsFromManager: async (_, { id, slotIds }) => {
      await removeSlotsFromManager(id, slotIds)
      return Manager.findById(id)
    },

    addClientsToManager: async (_, { id, clientIds }) => {
      await addClientsToManager(id, clientIds)
      return Manager.findById(id)
    },

    removeClientsFromManager: async (_, { id, clientIds }) => {
      await removeClientsFromManager(id, clientIds)
      return Manager.findById(id)
    },
  },

  Manager: {
    team: async (manager) => {
      await manager.populate({ path: "team" }).execPopulate()
      return manager.team
    },

    user: async (manager) => {
      await manager.populate({ path: "user" }).execPopulate()
      return manager.user
    },

    slots: async (manager) => getSlotsForManager(manager),

    clients: async (manager) => getClientsForManager(manager),

    clientsCount: async (manager) => getClientsCountForManager(manager),
  },
}

export default resolvers
