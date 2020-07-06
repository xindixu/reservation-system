import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Modal as AntModal } from "antd"
import ClientFrom from "components/forms/client-form"
import ClientsTable from "components/table/clients-table"
import { GET_ALL_CLIENTS, CREATE_CLIENT, UPDATE_CLIENT } from "graphql/clients"
import { GET_ALL_MANAGERS } from "graphql/managers"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import { getFullName } from "lib/utils"

const { confirm } = AntModal

const MODALS = {
  addClient: "addClient",
  editClient: "editClient",
  deleteClient: "deleteClient",
}

const Clients = () => {
  const { loading, error, data } = useQuery(GET_ALL_CLIENTS)
  const { data: managersData } = useQuery(GET_ALL_MANAGERS)

  const [addClient] = useMutation(CREATE_CLIENT, {
    update: (cache, { data: { createClient } }) => {
      const { client } = createClient
      const { clients } = cache.readQuery({ query: GET_ALL_CLIENTS })
      cache.writeQuery({
        query: GET_ALL_CLIENTS,
        data: {
          clients: [...clients, client],
        },
      })
    },
  })

  const [editClient] = useMutation(UPDATE_CLIENT)

  const [selectedClient, setSelectedClient] = useState({})
  const [modalToShow, setModalToShow] = useState("")

  if (error) {
    return `Error! ${error.message}`
  }

  return (
    <>
      <ClientsTable
        loading={loading}
        clients={data?.clients}
        managers={managersData?.managers}
        edit={(client) => {
          setSelectedClient(client)
          setModalToShow(MODALS.editClient)
        }}
        delete={() => setModalToShow(MODALS.deleteClient)}
      />

      {modalToShow === MODALS.addClient && (
        <Modal
          title="Create New Client"
          onClose={() => setModalToShow("")}
          submitButtonText="Create"
        >
          {({ form }) => (
            <ClientFrom form={form} onSubmit={(values) => addClient({ variables: values })} />
          )}
        </Modal>
      )}
      {modalToShow === MODALS.editClient && (
        <Modal
          title={`Edit ${getFullName(selectedClient)}`}
          onClose={() => setModalToShow("")}
          submitButtonText="Update"
        >
          {({ form }) => (
            <ClientFrom
              form={form}
              initialClient={{ ...selectedClient, managerId: selectedClient.manager.id }}
              onSubmit={(values) => editClient({ variables: { id: selectedClient.id, ...values } })}
            />
          )}
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addClient)}
        ariaLabel="new client"
        rotate={!!modalToShow}
      />
    </>
  )
}

export default Clients
