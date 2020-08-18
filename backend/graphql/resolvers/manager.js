import { checkObjectId } from "../../utils/validators.js"
import Manager from "../../models/manager.js"
import { findTeamById } from "../../models/team.js"
import { getSlotsForManager, addSlotsToManager, removeSlotsFromManager } from "../../models/slot.js"
import {
  getClientsCountForManager,
  getClientsForManager,
  addClientsToManager,
  removeClientsFromManager,
} from "../../models/client.js"

const resolvers = {
  Query: {
    manager: async (_, { id }) => {
      await checkObjectId(id)
      return Manager.findById(id)
    },
    managers: async () => {
      return Manager.find()
    },
  },

  Mutation: {
    createManager: async (_, { input }) => {
      const { firstName, lastName, jobTitle, email, phone, teamId } = input
      const team = await findTeamById(teamId)
      const manager = await Manager.create({
        firstName,
        lastName,
        jobTitle,
        email,
        phone,
        team,
      })

      return manager
    },

    updateManager: async (_, { input }) => {
      const { id, teamId, ...updates } = input
      await checkObjectId(id)

      const team = teamId ? await findTeamById(teamId) : undefined
      const manager = await Manager.findByIdAndUpdate(
        id,
        { ...updates, team },
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

    slots: async (manager) => getSlotsForManager(manager),

    clients: async (manager) => getClientsForManager(manager),
    clientsCount: async (manager) => getClientsCountForManager(manager),
  },
}

export default resolvers
