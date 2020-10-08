import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Filter from "containers/filter"
import ClientForm from "components/forms/client-form"
import ClientsTable from "components/table/clients-table"
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
  const { t } = useTranslation()

  const {
    clients,
    loadingClients,
    errorClients,
    loadClients,
    fetchMoreClients,
    addClient,
    editClient,
    deleteClient,
    setClientFilters,
  } = useClients()

  useEffect(() => {
    loadClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [selectedClient, setSelectedClient] = useState({})
  const [modalToShow, setModalToShow] = useState("")

  if (errorClients) {
    return `Error! ${errorClients.message}`
  }

  return (
    <>
      <Filter enabledFilters={["manager"]} onFilterChange={setClientFilters} />
      <ClientsTable
        loading={loadingClients}
        clients={clients?.clients}
        hasNext={clients?.hasNext}
        fetchMore={fetchMoreClients}
        editClient={(client) => {
          setSelectedClient(client)
          setModalToShow(MODALS.editClient)
        }}
        deleteClient={(client) =>
          getConfirm({
            content: <p>{t("message.deleteClient", { client: getFullName(client) })}</p>,
            onConfirm: () => {
              deleteClient({ variables: { id: client.id } })
            },
          })
        }
      />

      {modalToShow === MODALS.addClient && (
        <Modal
          title={`${t("common.create")} ${t("common.client")}`}
          onClose={() => setModalToShow("")}
          submitButtonText={t("common.create")}
        >
          {({ form }) => (
            <ClientForm form={form} onSubmit={(values) => addClient({ variables: values })} />
          )}
        </Modal>
      )}
      {modalToShow === MODALS.editClient && (
        <Modal
          title={`${t("common.edit")} ${getFullName(selectedClient)}`}
          onClose={() => setModalToShow("")}
          submitButtonText={t("common.update")}
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
        title={`${t("common.create")} ${t("common.client")}`}
        rotate={!!modalToShow}
      />
    </>
  )
}

export default Clients
