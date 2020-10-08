import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Modal from "components/modal"
import ManagerForm from "components/forms/manager-form"
import FAButton from "components/floating-action-button"
import ManagersGrid from "components/grid/managers-grid"
import useManagers from "data/use-managers"

const MODALS = {
  addManager: "addManager",
}

const Managers = () => {
  const { t } = useTranslation()

  const {
    managers,
    errorManagers,
    loadingManagers,
    loadManagers,
    addManager,
    fetchMoreManagers,
  } = useManagers()

  useEffect(() => {
    loadManagers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [modalToShow, setModalToShow] = useState("")

  if (errorManagers) {
    return `Error! ${errorManagers.message}`
  }

  return (
    <>
      <ManagersGrid
        managers={managers?.managers}
        hasNext={managers?.hasNext}
        fetchMore={fetchMoreManagers}
        loading={loadingManagers}
      />
      {modalToShow === MODALS.addManager && (
        <Modal
          title={`${t("common.create")} ${t("common.manager")}`}
          onClose={() => setModalToShow("")}
          submitButtonText={t("common.create")}
        >
          {({ form }) => (
            <ManagerForm form={form} onSubmit={(values) => addManager({ variables: values })} />
          )}
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addManager)}
        ariaLabel={`${t("common.create")} ${t("common.manager")}`}
        rotate={!!modalToShow}
      />
    </>
  )
}

export default Managers
