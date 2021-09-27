import faker from "faker"
import mongoose from "mongoose"
import teams from "../1-teams/index.js"
import managers from "../2-managers/index.js"
import { dedupArray, phone } from "../utils.js"

const { ObjectId } = mongoose.Types

const getManagersInTeam = (teamId) => managers.filter(({ team }) => team === teamId)

const generateClients = () => {
  const clients = []
  teams.forEach(({ id: teamId }) => {
    const managersInTeam = getManagersInTeam(teamId)
    const num = faker.random.number({ min: 5, max: 20 })

    ;[...Array(num).keys()].forEach(() => {
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      const cycle = faker.random.number({ min: 7, max: 30 })
      const duration = faker.random.number({ min: 2, max: Math.max(2, cycle - 10) })
      const numOfManagers = faker.random.number({ min: 1, max: 3 })

      const client = {
        id: ObjectId(),
        firstName,
        lastName,
        email: faker.internet.email(firstName, lastName),
        phone: phone(),
        cycle,
        duration,
        managers: dedupArray(
          [...Array(numOfManagers).keys()].map(() => faker.random.arrayElement(managersInTeam).id)
        ),
      }
      clients.push(client)
    })
  })
  return clients
}

const clients = generateClients()
module.exports = clients
export default clients
