import React from "react"
import Base from "./base-select"
import useClients from "data/use-clients"
import { getFullName } from "lib/utils"

const ClientFilter = () => {
  const { clients, loadingClients, loadClients } = useClients()

  const props = {
    label: "Clients",
    name: "clientIds",
    onFocus: loadClients,
    loading: loadingClients,
    options: clients?.clients,
    itemToString: (item) => getFullName(item),
  }

  return <Base {...props} />
}

export default ClientFilter
