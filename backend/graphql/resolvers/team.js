import { checkObjectId } from "../../utils/validators.js"
import Team from "../../models/team.js"
import Manager, { areManagerIdsValid } from "../../models/manager.js"
import Slot, { areSlotIdsValid } from "../../models/slot.js"

const resolvers = {
  Query: {
    team: async (_, { id }) => {
      await checkObjectId(id)
      return Team.findById(id)
    },
    teams: async () => Team.find().sort({ name: 1 }),
  },

  Mutation: {
    createTeam: async (_, { input }) => {
      const { name, description, email, phone } = input
      return Team.create({
        name,
        description,
        email,
        phone,
      })
    },

    updateTeam: async (_, { input }) => {
      const { id, managerIds, slotIds, ...updates } = input
      await checkObjectId(id)

      if (managerIds) {
        await areManagerIdsValid(managerIds)
        await Manager.updateMany({ _id: { $in: managerIds } }, { team: id })
      }

      if (slotIds) {
        await areSlotIdsValid(slotIds)
        await Slot.updateMany({ _id: { $in: slotIds } }, { team: id })
      }
      return Team.findByIdAndUpdate(id, updates, { new: true })
    },

    destroyTeam: async (_, { id }) => {
      await checkObjectId(id)
      const result = await Team.deleteOne({ _id: id })
      // delete dependent managers and slots
      await Manager.deleteMany({ team: id })
      await Slot.deleteMany({ team: id })
      return result.n === 1 ? id : null
    },

    addManagerToTeam: async (_, { id, managerIds }) => {},
  },

  Team: {
    managers: async (team) =>
      Manager.where("team").equals(team.id).sort({ firstName: 1, lastName: 1 }),

    managersCount: async (team) => Manager.countDocuments({ team: team.id }),

    slots: async (team) => Slot.where("team").equals(team.id).sort({ name: 1 }),

    user: async (team) => {
      await team.populate({ path: "user" }).execPopulate()
      return team.user
    },
  },
}

export default resolvers
