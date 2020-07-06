import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import ClientFrom from "components/forms/client-form"
import ClientsTable from "components/table/clients-table"
import { GET_ALL_CLIENTS, CREATE_CLIENT } from "graphql/clients"
import { GET_ALL_MANAGERS } from "graphql/managers"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"

const MODALS = {
  addClient: "addClient",
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

  const [modalToShow, setModalToShow] = useState("")

  if (loading) {
    return "Loading..."
  }
  if (error) {
    return `Error! ${error.message}`
  }

  return (
    <>
      <ClientsTable clients={data.clients} managers={managersData.managers} />

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
      <FAButton
        onClick={() => setModalToShow(MODALS.addClient)}
        ariaLabel="new client"
        rotate={modalToShow}
      />
    </>
  )
}

export default Clients
