import React from "react"
import { startCase } from "lodash"
import Base from "./base-select"
import useClients from "data/use-clients"
import { getFullName } from "lib/utils"

const ClientFilter = ({ t }) => {
  const { clients, loadingClients, loadClients } = useClients()

  const props = {
    label: startCase(t("term.client.plural")),
    name: "clientIds",
    onFocus: loadClients,
    loading: loadingClients,
    options: clients?.clients,
    itemToString: (item) => getFullName(item),
    t,
  }

  return <Base {...props} />
}

export default ClientFilter
