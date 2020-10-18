import React, { useState } from "react"
import { startCase } from "lodash"
import { useDebounce } from "react-use"
import Base from "./base-select"
import useSlots from "data/use-slots"

const SlotFilter = ({ t }) => {
  const [inputValue, setInputValue] = useState("")
  const { search, searchSlots, searching } = useSlots()

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
    itemToString: (item) => item.name,
    label: startCase(t("common.slot_plural")),
    loading: searching,
    name: "slotIds",
    onFocus: () => {},
    onInputChange: setInputValue,
    options: searchSlots,
    t,
  }

  return <Base {...props} />
}

export default SlotFilter
