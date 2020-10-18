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
    label: startCase(t("common.manager_plural")),
    name: "managerIds",
    onFocus: () => {},
    loading: searching,
    options: searchManagers,
    itemToString: (item) => getFullName(item),
    t,
    onInputChange: setInputValue,
  }

  return <Base {...props} />
}

export default ManagerFilter
