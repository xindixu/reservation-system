import { UserInputError } from "apollo-server-express"
import { objectId } from "../../validators/index.js"
import Team from "../../models/team.js"
import Manager from "../../models/manager.js"

const resolvers = {
  Query: {
    team: async (_, { id }) => {
      const { error } = await objectId.validate(id)
      if (error) {
        throw new UserInputError(`${id} is not a valid object id.`)
      }
      return Team.findById(id)
    },
    teams: async () => Team.find(),
  },

  Mutation: {
    createTeam: async (_, { input }) => {
      const { name, description, email, phone } = input
      const team = await new Team({
        name,
        description,
        email,
        phone,
      }).save()
      return team
    },

    updateTeam: async (_, { input }) => {
      const { id, managerIds, ...rest } = input
      const { error } = await objectId.validate(id)

      if (error) {
        throw new UserInputError(`${id} is not a valid object id.`)
      }

      if (managerIds) {
        const managerIdsFound = await Manager.where("_id").in(managerIds).countDocuments()

        if (managerIdsFound !== managerIds.length) {
          throw new UserInputError("One or more Manager IDs are invalid.")
        }
        await Manager.updateMany(
          {
            _id: { $in: managerIds },
          },
          {
            team: id,
          }
        )
      }

      const team = await Team.findByIdAndUpdate(
        id,
        {
          ...rest,
        },
        {
          new: true,
        }
      )

      return team
    },
  },

  Team: {
    managers: async (team) => {
      const managers = await Manager.where("team").equals(team.id)
      return managers
    },
  },
}

export default resolvers
