import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_ALL_MANAGERS, CREATE_MANAGER } from "graphql/managers"
import Modal from "components/modal"
import ManagerForm from "components/forms/manager-form"
import FAButton from "components/floating-action-button"
import ManagersGrid from "components/grid/managers-grid"

const MODALS = {
  addManager: "addManager",
}

const Managers = () => {
  const { loading, error, data } = useQuery(GET_ALL_MANAGERS)
  const [addManager] = useMutation(CREATE_MANAGER, {
    update: (cache, { data: { createManager } }) => {
      const { manager } = createManager
      const { managers } = cache.readQuery({ query: GET_ALL_MANAGERS })
      cache.writeQuery({
        query: GET_ALL_MANAGERS,
        data: {
          managers: [...managers, manager],
        },
      })
    },
  })

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
      <ManagersGrid managers={data.managers} />
      <FAButton
        onClick={() => setModalToShow(MODALS.addManager)}
        ariaLabel="new manager"
        rotate={modalToShow}
      />
      {modalToShow === MODALS.addManager && (
        <Modal
          title="Create New Manager"
          onClose={() => setModalToShow("")}
          onSubmit={() => addManager({ variables: manager })}
          submitButtonText="Create"
        >
          <ManagerForm manager={manager} setManager={setManager} />
        </Modal>
      )}
    </>
  )
}

export default Managers
