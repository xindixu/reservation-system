import faker from "faker"
import mongoose from "mongoose"
import { phone } from "../utils.js"

const { ObjectId } = mongoose.Types

const generateTeams = () =>
  [...Array(5).keys()].map(() => ({
    id: ObjectId(),
    name: faker.company.companyName(),
    description: faker.lorem.sentences(2),
    email: faker.internet.email(),
    phone: phone(),
  }))

const teams = generateTeams()
module.exports = teams
export default teams
