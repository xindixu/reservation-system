import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/react-hooks"
import ClientForm from "components/forms/client-form"
import ClientsTable from "components/table/clients-table"
import { GET_ALL_MANAGERS } from "graphql/managers"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import { getFullName } from "lib/utils"
import getConfirm from "components/confirm"
import useClients from "data/use-clients"

const MODALS = {
  addClient: "addClient",
  editClient: "editClient",
  deleteClient: "deleteClient",
}

const Clients = () => {
  const { data: managersData, loading: loadingManager } = useQuery(GET_ALL_MANAGERS)
  const {
    clients,
    loadingClients,
    errorClients,
    loadClients,
    fetchMoreClients,
    addClient,
    editClient,
    deleteClient,
  } = useClients()

  useEffect(() => {
    loadClients()
  }, [])

  const [selectedClient, setSelectedClient] = useState({})
  const [modalToShow, setModalToShow] = useState("")

  if (errorClients) {
    return `Error! ${errorClients.message}`
  }

  if (loadingClients) {
    return "loading"
  }

  return (
    <>
      <ClientsTable
        loading={loadingClients || loadingManager}
        clients={clients?.clients}
        managers={managersData?.managers}
        hasNext={clients?.hasNext}
        fetchMore={fetchMoreClients}
        editClient={(client) => {
          setSelectedClient(client)
          setModalToShow(MODALS.editClient)
        }}
        deleteClient={(client) =>
          getConfirm({
            content: (
              <p>
                You are about to delete <strong>{getFullName(client)}</strong>. It will remove all
                data related to this slot, including Visits.
              </p>
            ),
            onConfirm: () => {
              deleteClient({ variables: { id: client.id } })
            },
          })
        }
      />

      {modalToShow === MODALS.addClient && (
        <Modal
          title="Create New Client"
          onClose={() => setModalToShow("")}
          submitButtonText="Create"
        >
          {({ form }) => (
            <ClientForm form={form} onSubmit={(values) => addClient({ variables: values })} />
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
            <ClientForm
              form={form}
              initialClient={{
                ...selectedClient,
                managerIds: selectedClient.managers.map((m) => m.id),
              }}
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
