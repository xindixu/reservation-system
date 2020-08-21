import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import ClientFrom from "components/forms/client-form"
import ClientsTable from "components/table/clients-table"
import { GET_ALL_CLIENTS, CREATE_CLIENT, UPDATE_CLIENT, DESTROY_CLIENT } from "graphql/clients"
import { GET_ALL_MANAGERS } from "graphql/managers"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import { getFullName } from "lib/utils"
import getConfirm from "components/confirm"

const MODALS = {
  addClient: "addClient",
  editClient: "editClient",
  deleteClient: "deleteClient",
}

const Clients = () => {
  const [page, setPage] = useState(1)
  const { loading, error, data, fetchMore } = useQuery(GET_ALL_CLIENTS, {
    variables: { size: 5, page },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  })
  const { data: managersData, loading: loadingManager } = useQuery(GET_ALL_MANAGERS)

  const [addClient] = useMutation(CREATE_CLIENT, {
    update: (cache, { data: { createClient } }) => {
      const client = createClient
      const { clients } = cache.readQuery({
        query: GET_ALL_CLIENTS,
        variables: { size: 5, page },
      })
      cache.writeQuery({
        query: GET_ALL_CLIENTS,
        variables: { size: 5, page },
        data: {
          clients: {
            ...clients,
            clients: [...clients.clients, client],
          },
        },
      })
    },
  })

  const [editClient] = useMutation(UPDATE_CLIENT)
  const [deleteClient] = useMutation(DESTROY_CLIENT, {
    update: (cache, { data: { destroyClient } }) => {
      const clientId = destroyClient
      const { clients } = cache.readQuery({
        query: GET_ALL_CLIENTS,
        variables: { size: 5, page },
      })

      cache.writeQuery({
        query: GET_ALL_CLIENTS,
        variables: { size: 5, page },
        data: {
          clients: {
            ...clients,
            clients: clients.clients.filter((c) => c.id !== clientId),
          },
        },
      })
    },
  })

  const [selectedClient, setSelectedClient] = useState({})
  const [modalToShow, setModalToShow] = useState("")

  if (error) {
    return `Error! ${error.message}`
  }

  const fetchMoreClients = (page) => {
    return fetchMore({
      variables: {
        page,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev
        }

        return fetchMoreResult
      },
    })
  }

  return (
    <>
      <ClientsTable
        page={page}
        setPage={setPage}
        loading={loading || loadingManager}
        data={data?.clients || {}}
        managers={managersData?.managers}
        editClient={(client) => {
          setSelectedClient(client)
          setModalToShow(MODALS.editClient)
        }}
        fetchMore={fetchMoreClients}
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
