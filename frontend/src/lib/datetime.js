import format from "date-fns/format"
import i18n from "locales/index"

const ISO_FORMATE_WITH_TZ = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"

export const toISOStringWithTZ = (date) => format(date, ISO_FORMATE_WITH_TZ)
export const formatStart = (start) => toISOStringWithTZ(new Date(start))
export const formatEnd = (end) => toISOStringWithTZ(new Date(end))

export const DURATION_UNITS = {
  d: i18n.t("common.days"),
  w: i18n.t("common.weeks"),
  M: i18n.t("common.months"),
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
