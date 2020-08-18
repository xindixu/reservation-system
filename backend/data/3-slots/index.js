import faker from "faker"
import mongoose from "mongoose"
import teams from "../1-teams/index.js"
import managers from "../2-managers/index.js"
import { dedupArray } from "../utils.js"

const { ObjectId } = mongoose.Types

const getManagersInTeam = (teamId) => managers.filter(({ team }) => team === teamId)

const generateSlots = () => {
  const slots = []
  teams.forEach(({ id: teamId }) => {
    const managersInTeam = getManagersInTeam(teamId)
    const num = faker.random.number({ min: 5, max: 10 })

    ;[...Array(num).keys()].forEach(() => {
      const numOfManagers = faker.random.number({ min: 1, max: 3 })

      const slot = {
        id: ObjectId(),
        name: faker.company.companyName(),
        description: faker.lorem.sentences(2),
        // boolean with ratio T:F of 8:2
        shareable: faker.random.number(100) < 80,
        team: teamId,
        managers: dedupArray(
          [...Array(numOfManagers).keys()].map(() => faker.random.arrayElement(managersInTeam).id)
        ),
      }
      slots.push(slot)
    })
  })
  return slots
}

const slots = generateSlots()
module.exports = slots
export default slots
