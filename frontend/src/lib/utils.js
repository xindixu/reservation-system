import { maxBy } from "lodash"
import moment from "moment"

const avatarSizes = {
  xs: "50x50",
  sm: "100x100",
  md: "250x250",
  lg: "500x500",
}

export const getFullName = (user) => `${user.firstName} ${user.lastName}`
export const getDefaultAvatar = (user, size) =>
  `https://robohash.org/${getFullName(user)}.png?size=${avatarSizes[size]}&set=set4`

export const calculateNextVisit = (client) => {
  const { cycle, duration, visits } = client
  const lastVisit = maxBy(visits, (visit) => visit.endsAt)
  const endOfLastVisit = moment(lastVisit.endsAt).add(1, "seconds")
  const startOfNextVisit = endOfLastVisit.add(cycle, "days")
  const endOfNextVisit = startOfNextVisit.add(duration, "days").subtract(1, "seconds")

  console.log(lastVisit.endsAt, cycle, duration)

  return [startOfNextVisit.toISOString(true), endOfNextVisit.toISOString(true)]
}
