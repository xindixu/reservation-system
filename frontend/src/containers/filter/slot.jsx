import React from "react"
import Base from "./base"
import useSlots from "data/use-slots"

const SlotFilter = () => {
  const { slots, loadingSlots, loadSlots } = useSlots()

  const props = {
    label: "Slots",
    name: "slotIds",
    onFocus: loadSlots,
    loading: loadingSlots,
    options: slots?.slots,
    itemToString: (item) => item.name,
  }

  return <Base {...props} />
}

export default SlotFilter
