import React, { useState } from "react"
import { startCase } from "lodash"
import { useDebounce } from "react-use"
import Base from "./base-select"
import useClients from "data/use-clients"
import { getFullName } from "lib/utils"

const ClientFilter = ({ t }) => {
  const [inputValue, setInputValue] = useState("")
  const { search, searchClients, searching } = useClients()

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
    label: startCase(t("common.client_plural")),
    loading: searching,
    name: "clientIds",
    onFocus: () => {},
    onInputChange: setInputValue,
    options: searchClients,
    t,
  }

  return <Base {...props} />
}

export default ClientFilter
