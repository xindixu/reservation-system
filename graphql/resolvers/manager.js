import Manager from "../../models/manager.js"
import Team from "../../models/team.js"

const parseManager = ({ _doc }) => ({
  ..._doc,
})

const manager = async (_, { id }) => Manager.findById(id)

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
