import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Typography, Button, Space } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import {
  GET_MANAGER_BY_ID,
  UPDATE_MANAGER,
  REMOVE_CLIENTS_FROM_MANAGER,
  ADD_CLIENTS_TO_MANAGER,
} from "graphql/managers"
import { GET_ALL_CLIENTS, GET_CLIENT_BY_ID } from "graphql/clients"
import { getFullName, getDefaultAvatar } from "lib/utils"
import ClientsTable from "components/table/clients-table"
import Modal from "components/modal"
import ManagerForm from "components/forms/manager-form"
import AddClientsToManager from "components/forms/add-client-to-manager"
import FAButton from "components/floating-action-button"
import getConfirm from "components/confirm"

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
  const { loading, error, data } = useQuery(GET_MANAGER_BY_ID, {
    variables: { id },
  })
  const [editManager] = useMutation(UPDATE_MANAGER)

  const [addClients] = useMutation(ADD_CLIENTS_TO_MANAGER, {
    update: (cache, { data: { addClientsToManager } }) => {
      const { manager } = addClientsToManager
      const { clients } = manager
      const { clients: prevClients } = data.manager
      const addedClients = clients.filter((pc) => !prevClients.some((c) => c.id === pc.id))
      addedClients.forEach((client) => {
        client.managers = [...client.managers, manager]
        cache.writeQuery({
          query: GET_CLIENT_BY_ID,
          variables: { id: client.id },
          data: {
            client,
          },
        })
      })
    },
  })

  const [removeClients] = useMutation(REMOVE_CLIENTS_FROM_MANAGER, {
    update: (cache, { data: { removeClientsFromManager } }) => {
      const { manager } = removeClientsFromManager
      const { clients } = manager
      const { clients: prevClients } = data.manager
      const deletedClients = prevClients.filter((pc) => !clients.some((c) => c.id === pc.id))
      deletedClients.forEach((client) => {
        client.managers = (client.managers || []).filter((m) => m.id !== manager.id)
        cache.writeQuery({
          query: GET_CLIENT_BY_ID,
          variables: { id: client.id },
          data: {
            client,
          },
        })
      })
    },
  })

  const [numOfClientsToAdd, setNumOfClientsToAdd] = useState(0)
  const [modalToShow, setModalToShow] = useState("")

  if (loading) {
    return "Loading..."
  }
  if (error) {
    return `Error!`
  }

  const { manager } = data
  const { jobTitle, team, clients } = manager

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
