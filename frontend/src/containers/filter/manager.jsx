import React from "react"
import Base from "./base-select"
import useManagers from "data/use-managers"
import { getFullName } from "lib/utils"

const ManagerFilter = () => {
  const { managers, loadingManagers, loadManagers } = useManagers()
  const props = {
    label: "Managers",
    name: "managerIds",
    onFocus: loadManagers,
    loading: loadingManagers,
    options: managers,
    itemToString: (item) => getFullName(item),
  }

  return <Base {...props} />
}

export default ManagerFilter
