import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import ClientsTable from "components/table/clients-table"
import { GET_ALL_CLIENTS, CREATE_MANAGER } from "graphql/clients"
import Modal from "components/modal"
import ManagerForm from "components/forms/manager-form"
import FAButton from "components/floating-action-button"

const MODALS = {
  addManager: "addManager",
}

const Clients = () => {
  const { loading, error, data } = useQuery(GET_ALL_CLIENTS)
  // const [addManager] = useMutation(CREATE_MANAGER, {
  //   update: (cache, { data: { createManager } }) => {
  //     const { manager } = createManager
  //     const { managers } = cache.readQuery({ query: GET_ALL_MANAGERS })
  //     cache.writeQuery({
  //       query: GET_ALL_MANAGERS,
  //       data: {
  //         managers: [...managers, manager],
  //       },
  //     })
  //   },
  // })

  const [manager, setManager] = useState({})
  const [modalToShow, setModalToShow] = useState("")

  if (loading) {
    return "Loading..."
  }
  if (error) {
    return `Error! ${error.message}`
  }

  return (
    <>
      <ClientsTable clients={data.clients} />
      <FAButton
        onClick={() => setModalToShow(MODALS.addManager)}
        ariaLabel="new manager"
        rotate={modalToShow}
      />
      {/* {modalToShow === MODALS.addManager && (
        <Modal
          title="Create New Manager"
          onClose={() => setModalToShow("")}
          onSubmit={() => addManager({ variables: manager })}
          primaryButtonText="Create"
        >
          <ManagerForm manager={manager} setManager={setManager} />
        </Modal>
      )} */}
    </>
  )
}

Clients.propTypes = {}

export default Clients
