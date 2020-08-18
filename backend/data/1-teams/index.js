import faker from "faker"
import mongoose from "mongoose"

const { ObjectId } = mongoose.Types

const generateTeams = () =>
  [...Array(5).keys()].map(() => ({
    id: ObjectId(),
    name: faker.company.companyName(),
    description: faker.lorem.sentences(2),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
  }))

const teams = generateTeams()
module.exports = teams
export default teams
