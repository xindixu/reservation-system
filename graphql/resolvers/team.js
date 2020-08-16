import mongoose from "mongoose"
import { UserInputError } from "apollo-server-express"
import Team from "../../models/team.js"

const parseTeam = ({ _doc }) => ({
  ..._doc,
  _id: undefined,
  id: _doc._id,
})

const team = async (_, { id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new UserInputError(`${id} is not a valid manager id.`)
  }
  return Team.findById(id)
}

const teams = async () => {
  const allTeams = await Team.find()
  return allTeams.map(parseTeam)
}

const createTeam = async (_, { input }) => {
  const { name, description, email, phone } = input
  const newTeam = await new Team({
    name,
    description,
    email,
    phone,
  }).save()

  return parseTeam(newTeam)
}

export const teamQueries = {
  team,
  teams,
}

export const teamMutations = {
  createTeam,
}
