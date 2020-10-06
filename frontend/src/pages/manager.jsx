import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { Typography, Button, Space } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import { getFullName, getDefaultAvatar } from "lib/utils"
import ClientsTable from "components/table/clients-table"
import Modal from "components/modal"
import ManagerForm from "components/forms/manager-form"
import AddClientsToManager from "components/forms/add-client-to-manager"
import FAButton from "components/floating-action-button"
import getConfirm from "components/confirm"
import useManagers from "data/use-managers"

const { Title } = Typography

const PageActions = ({ t, manager: { email, phone }, edit }) => (
  <Space size="middle" className="py-4">
    <Button key="edit" type="primary" icon={<EditOutlined />} onClick={edit}>
      {t("common.edit")}
    </Button>
    <Button key="email" type="default" icon={<MailOutlined />} href={`mailto:${email}`}>
      {t("common.email")}
    </Button>
    <Button key="phone" type="default" icon={<PhoneOutlined />} href={`tel:${phone}`}>
      {t("common.call")}
    </Button>
  </Space>
)

const MODALS = {
  editManager: "editManager",
  addClientsToManager: "addClientsToManager",
  removeClient: "removeClient",
}

const Manager = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const {
    manager,
    errorManager,
    loadingManager,
    loadManager,
    editManager,
    addClients,
    removeClients,
  } = useManagers(id)

  useEffect(() => {
    loadManager()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [numOfClientsToAdd, setNumOfClientsToAdd] = useState(0)
  const [modalToShow, setModalToShow] = useState("")

  if (loadingManager) {
    return "Loading..."
  }
  if (errorManager) {
    return `Error!`
  }

  const { jobTitle, team, clients = [] } = manager

  const fullName = getFullName(manager)
  return (
    <>
      <div className="flex space-between bg-white rounded-lg px-10 mb-10">
        <div className="flex-grow py-10 capitalize">
          <Title>{fullName}</Title>
          <p>
            {t("common.jobTitle")}: {jobTitle}
          </p>
          <p>
            {t("term.team")}: {team.name}
          </p>
          <PageActions manager={manager} edit={() => setModalToShow(MODALS.editManager)} t={t} />
        </div>
        <div className="bg-white rounded-lg">
          <img src={getDefaultAvatar(manager, "md")} alt={fullName} />
        </div>
      </div>
      <ClientsTable
        clients={clients}
        deleteClient={(client) => {
          getConfirm({
            content: (
              <p>
                {t("message.removeClientsFromManager", {
                  client: getFullName(client),
                  manager: fullName,
                })}
              </p>
            ),
            onConfirm: () => {
              removeClients({ variables: { id, clientIds: [client.id] } })
            },
          })
        }}
      />
      {modalToShow === MODALS.editManager && (
        <Modal
          title={`${t("common.edit")} ${fullName}`}
          onClose={() => setModalToShow("")}
          submitButtonText={t("common.update")}
        >
          {({ form }) => (
            <ManagerForm
              initialManager={{ ...manager, teamId: manager.team.id }}
              form={form}
              onSubmit={(values) => editManager({ variables: { id, ...values } })}
            />
          )}
        </Modal>
      )}

      {modalToShow === MODALS.addClientsToManager && (
        <Modal
          title={t("message.addClientsToManager", { manager: fullName })}
          onClose={() => setModalToShow("")}
          submitButtonText={`${t("common.add")} ${t("term.clientWithCount", {
            count: numOfClientsToAdd,
          })}`}
        >
          {({ form }) => (
            <AddClientsToManager
              initialManager={manager}
              form={form}
              setNumOfClientsToAdd={setNumOfClientsToAdd}
              onSubmit={(values) => addClients({ variables: { id, ...values } })}
            />
          )}
        </Modal>
      )}

      <FAButton
        onClick={() => setModalToShow(MODALS.addClientsToManager)}
        title={t("message.addClientsToManager", { manager: fullName })}
        rotate={modalToShow === MODALS.addClientsToManager}
      />
    </>
  )
}

export default Manager
