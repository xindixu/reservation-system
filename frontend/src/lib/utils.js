import { maxBy } from "lodash"
import add from "date-fns/add"
import { toISOStringWithTZ } from "./datetime"

const avatarSizes = {
  xs: "50x50",
  sm: "100x100",
  md: "250x250",
  lg: "500x500",
}

export const getFullName = (user) => `${user.firstName} ${user.lastName}`
export const getDefaultAvatar = (user, size = "xs") =>
  `https://robohash.org/${getFullName(user)}.png?size=${avatarSizes[size]}&set=set4`

export const calculateNextVisit = (client, visits) => {
  const { cycle, duration } = client
  const lastVisit = maxBy(visits, (visit) => visit.endsAt)
  const endOfLastVisit = lastVisit ? new Date(lastVisit.endsAt) : new Date()
  const startOfNextVisit = add(endOfLastVisit, { seconds: 1, days: cycle })
  const endOfNextVisit = add(startOfNextVisit, { days: duration })

  return [toISOStringWithTZ(startOfNextVisit), toISOStringWithTZ(endOfNextVisit)]
}

const formatField = (record, sortBy) => {
  let field = record[sortBy]
  if (Array.isArray(field)) {
    field = field.join("")
  }
  if (!field && field !== 0) {
    return undefined
  }

  if (typeof field === "string") {
    return field.toLowerCase()
  }

  return field
}

export const comparator = (a, b, sortOrder = []) => {
  let order
  sortOrder.some((sortBy) => {
    let direction = 1
    let sortByField = sortBy
    if (sortBy[0] === "-") {
      direction = -1
      sortByField = sortByField.slice(1)
    }

    const fieldA = formatField(a, sortByField)
    const fieldB = formatField(b, sortByField)

    if (fieldA && fieldB && fieldA.localeCompare && fieldB.localeCompare) {
      order = fieldA.localeCompare(fieldB)
    } else if (fieldA > fieldB || !fieldA) {
      order = 1
    } else if (fieldA < fieldB || !fieldB) {
      order = -1
    } else {
      order = 0
    }
    order *= direction
    return order !== 0
  })

  return order
}

export const route = () => ({
  manager: (id) => `/manager/${id}`,
  client: (id) => `/client/${id}`,
  team: (id) => `/team/${id}`,
})
