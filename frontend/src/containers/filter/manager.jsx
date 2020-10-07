import React from "react"
import { startCase } from "lodash"
import Base from "./base-select"
import useManagers from "data/use-managers"
import { getFullName } from "lib/utils"

const ManagerFilter = ({ t }) => {
  const { managers, loadingManagers, loadManagers } = useManagers()
  const props = {
    label: startCase(t("common.manager_plural")),
    name: "managerIds",
    onFocus: loadManagers,
    loading: loadingManagers,
    options: managers,
    itemToString: (item) => getFullName(item),
    t,
  }

  return <Base {...props} />
}

export default ManagerFilter
