import faker from "faker"
import mongoose from "mongoose"

import slots from "./3-slots.js"
import clients from "./4-clients.js"

const { ObjectId } = mongoose.Types

const getSlotsForManager = (mangerId) => slots.filter(({ managers }) => managers.includes(mangerId))
const getSlotsForTeam = (teamId) => slots.filter(({ team }) => team === teamId)

const getSlot = (managers) => {
  const manager = faker.random.arrayElement(managers)
  let possibleSlots = getSlotsForManager(manager.id)

  if (possibleSlots.length === 0) {
    possibleSlots = getSlotsForTeam(manager.team)
  }
  if (possibleSlots.length === 0) {
    possibleSlots = slots
  }
  return faker.random.arrayElement(possibleSlots)
}

const addDays = (refDate, days) => {
  const refDateObj = new Date(refDate)
  refDateObj.setDate(refDateObj.getDate() + days)
  return refDateObj
}
const generateVisits = () => {
  const visits = []
  clients.forEach(({ id: clientId, duration, managers }) => {
    const num = faker.random.number({ min: 2, max: 5 })

    ;[...Array(num).keys()].forEach(() => {
      const slot = getSlot(managers)
      const start = faker.date.between("2020-01-01", "2020-12-31")
      const end = addDays(start, duration)
      const visit = {
        id: ObjectId(),
        start,
        end,
        client: clientId,
        slot: slot.id,
      }
      visits.push(visit)
    })
  })
  return visits
}

const visits = generateVisits()
export default visits
