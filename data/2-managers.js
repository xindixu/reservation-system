import faker from "faker"
import mongoose from "mongoose"
import teams from "./1-teams.js"

const { ObjectId } = mongoose.Types

const generateMangers = () =>
  [...Array(15).keys()].map((index) => {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    return {
      id: ObjectId(),
      firstName,
      lastName,
      email: faker.internet.email(firstName, lastName),
      phone: faker.phone.phoneNumber(),
      team: teams[index % teams.length].id,
    }
  })

const managers = generateMangers()
export default managers
