import format from "date-fns/format"
import sub from "date-fns/sub"

const ISO_FORMATE_WITH_TZ = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"

export const toISOStringWithTZ = (date) => format(date, ISO_FORMATE_WITH_TZ)
export const formatStart = (start) => toISOStringWithTZ(new Date(start))
export const formatEnd = (end) => toISOStringWithTZ(sub(new Date(end), { seconds: 1 }))

export const DURATION_UNITS = {
  d: "day(s)",
  w: "week(s)",
  M: "month(s)",
}
export const convertToDays = (num, unit) => {
  if (unit === "d") {
    return num
  }
  if (unit === "w") {
    return num * 7
  }
  if (unit === "M") {
    return num * 30
  }
}
