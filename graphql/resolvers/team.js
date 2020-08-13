import Team from "../../models/team.js"

const parseTeam = ({ _doc }) => ({
  ..._doc,
})

const team = async (_, { id }) => Team.findById(id)

const teams = async () => {
  const allTeams = await Team.find()
  return allTeams.map(parseTeam)
}

const createTeam = async (_, { teamInput }) => {
  // if (!isAuth) {
  //   throw new Error("Unauthenticated")
  // }
  const { name, description, email, phone } = teamInput
  const newTeam = await new Team({
    name,
    description,
    email,
    phone,
  }).save()

  return parseTeam(newTeam)
}

export { team, teams, createTeam }
