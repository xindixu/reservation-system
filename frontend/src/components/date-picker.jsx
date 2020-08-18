import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns"
import generatePicker from "antd/es/date-picker/generatePicker"
import "antd/es/date-picker/style/index"

const { format: localeFormat } = dateFnsGenerateConfig.locale

const configOverride = {
  ...dateFnsGenerateConfig,
  locale: {
    ...dateFnsGenerateConfig.locale,
    getShortMonths: () => [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    getShortWeekDays: () => ["日", "一", "二", "三", "四", "五", "六"],
    format: (local, date, format) => {
      if (/\[.+\]/.test(format)) {
        const f = format.replace(/\[|\]/g, "'")
        return localeFormat(local, date, f)
      }
      return localeFormat(local, date, format)
    },
  },
}

const DatePicker = generatePicker(configOverride)

export default DatePicker
