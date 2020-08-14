import mongoose from "mongoose"
import { UserInputError } from "apollo-server-express"
import Manager from "../../models/manager.js"
import Team from "../../models/team.js"

const parseManager = ({ _doc }) => ({
  ..._doc,
})

const manager = async (_, { id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new UserInputError(`${id} is not a valid manager id.`)
  }
  return Manager.findById(id)
}

const managers = async () => {
  const allManagers = await Manager.find()
  return allManagers.map(parseManager)
}

const createManager = async (_, { managerInput }) => {
  // if (!isAuth) {
  //   throw new Error("Unauthenticated")
  // }
  const { firstName, lastName, jobTitle, email, phone, teamId } = managerInput
  const team = await Team.findOne({ _id: teamId })
  if (!team) {
    throw new UserInputError(`${teamId} is not a valid team id.`)
  }
  const newManager = await new Manager({
    firstName,
    lastName,
    jobTitle,
    email,
    phone,
    team,
  }).save()

  team.managers.push(newManager)
  await team.save()
  return parseManager(newManager)
}

export { manager, managers, createManager }
