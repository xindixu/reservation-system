import React from "react"
import { startCase } from "lodash"
import Base from "./base-select"
import useSlots from "data/use-slots"

const SlotFilter = ({ t }) => {
  const { slots, loadingSlots, loadSlots } = useSlots()

  const props = {
    label: startCase(t("term.slot.plural")),
    name: "slotIds",
    onFocus: loadSlots,
    loading: loadingSlots,
    options: slots?.slots,
    itemToString: (item) => item.name,
    t,
  }

  return <Base {...props} />
}

export default SlotFilter
