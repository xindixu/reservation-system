import Team from "../../models/team.js"

const parseTeam = ({ _doc }) => ({
  ..._doc,
})

const teams = async () => {
  const allTeams = await Team.find()
  return allTeams.map(parseTeam)
}

const createTeam = async (_, { teamInput }) => {
  // if (!isAuth) {
  //   throw new Error("Unauthenticated")
  // }
  const { name, description, email, phone } = teamInput
  const team = await new Team({
    name,
    description,
    email,
    phone,
  }).save()

  return parseTeam(team)
}

export { teams, createTeam }
