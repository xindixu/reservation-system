import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Typography, Button, Space } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import { GET_CLIENT_BY_ID } from "graphql/clients"
import { getFullName, getDefaultAvatar } from "lib/utils"
import ClientsTable from "components/table/clients-table"
import Modal from "components/modal"
import ManagerForm from "components/forms/manager-form"
import AddClientsToManager from "components/forms/add-client-to-manager"
import FAButton from "components/floating-action-button"
import getConfirm from "components/confirm"
import useManagers from "data/use-managers"

const { Title } = Typography

const PageActions = ({ manager: { email, phone }, edit }) => (
  <Space size="middle" className="py-4">
    <Button key="edit" type="primary" icon={<EditOutlined />} onClick={edit}>
      Edit
    </Button>
    <Button
      key="email"
      type="default"
      icon={<MailOutlined />}
      aria-label="email team"
      href={`mailto:${email}`}
    >
      Email
    </Button>

    <Button
      key="phone"
      type="default"
      icon={<PhoneOutlined />}
      aria-label="call team"
      href={`tel:${phone}`}
    >
      Call
    </Button>
  </Space>
)

const MODALS = {
  editManager: "editManager",
  addClientsToManager: "addClientsToManager",
  removeClient: "removeClient",
}

const Manager = () => {
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
        <div className="flex-grow py-10">
          <Title>{fullName}</Title>
          <p>Job Title: {jobTitle}</p>
          <p>Team: {team.name}</p>
          <PageActions manager={manager} edit={() => setModalToShow(MODALS.editManager)} />
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
                You are about to remove <strong>{getFullName(client)}</strong> from {fullName}.
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
          title={`Edit ${fullName}`}
          onClose={() => setModalToShow("")}
          submitButtonText="Update"
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
          title={`Add Clients To ${fullName}`}
          onClose={() => setModalToShow("")}
          submitButtonText={`Add ${numOfClientsToAdd} Clients`}
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
        ariaLabel="add clients to manager"
        rotate={modalToShow === MODALS.addClientsToManager}
      />
    </>
  )
}

export default Manager
