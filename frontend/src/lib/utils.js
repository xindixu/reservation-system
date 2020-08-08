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
export const getDefaultAvatar = (user, size) =>
  `https://robohash.org/${getFullName(user)}.png?size=${avatarSizes[size]}&set=set4`

export const calculateNextVisit = (client, visits) => {
  const { cycle, duration } = client
  const lastVisit = maxBy(visits, (visit) => visit.endsAt)
  const endOfLastVisit = lastVisit ? new Date(lastVisit.endsAt) : new Date()
  const startOfNextVisit = add(endOfLastVisit, { seconds: 1, days: cycle })
  const endOfNextVisit = add(startOfNextVisit, { days: duration })

  return [toISOStringWithTZ(startOfNextVisit), toISOStringWithTZ(endOfNextVisit)]
}
