import React, { useState } from "react"
import { startCase } from "lodash"
import { useDebounce } from "react-use"
import Base from "./base-select"
import useManagers from "data/use-managers"
import { getFullName } from "lib/utils"

const ManagerFilter = ({ t }) => {
  const [inputValue, setInputValue] = useState("")
  const { search, searchManagers, searching } = useManagers()

  useDebounce(
    () => {
      if (inputValue) {
        search({ variables: { q: inputValue } })
      }
    },
    1000,
    [inputValue]
  )

  const props = {
    itemToString: (item) => getFullName(item),
    label: startCase(t("common.manager_plural")),
    loading: searching,
    name: "managerIds",
    onFocus: () => {},
    onInputChange: setInputValue,
    options: searchManagers,
    t,
  }

  return <Base {...props} />
}

export default ManagerFilter
