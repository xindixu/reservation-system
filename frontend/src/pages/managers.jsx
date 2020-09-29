import React, { useState, useEffect } from "react"
import Modal from "components/modal"
import ManagerForm from "components/forms/manager-form"
import FAButton from "components/floating-action-button"
import ManagersGrid from "components/grid/managers-grid"
import useManagers from "data/use-managers"

const MODALS = {
  addManager: "addManager",
}

const Managers = () => {
  const { managers, errorManagers, loadingManagers, loadManagers, addManager } = useManagers()

  useEffect(() => {
    loadManagers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [modalToShow, setModalToShow] = useState("")

  if (loadingManagers) {
    return "Loading..."
  }
  if (errorManagers) {
    return `Error! ${errorManagers.message}`
  }

  return (
    <>
      <ManagersGrid managers={managers} />
      <FAButton
        onClick={() => setModalToShow(MODALS.addManager)}
        ariaLabel="new manager"
        rotate={!!modalToShow}
      />
      {modalToShow === MODALS.addManager && (
        <Modal
          title="Create New Manager"
          onClose={() => setModalToShow("")}
          submitButtonText="Create"
        >
          {({ form }) => (
            <ManagerForm form={form} onSubmit={(values) => addManager({ variables: values })} />
          )}
        </Modal>
      )}
    </>
  )
}

export default Managers
