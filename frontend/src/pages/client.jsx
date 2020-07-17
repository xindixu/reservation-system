import React, { useState } from "react"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Typography, Button, Space, Tag } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import { GET_CLIENT_BY_ID, UPDATE_CLIENT } from "graphql/clients"
import { getFullName } from "lib/utils"
import ClientFrom from "components/forms/client-form"
import Modal from "components/modal"

const { Title } = Typography

const MODALS = {
  editClient: "editClient",
  addClientsToManager: "addClientsToManager",
  removeClient: "removeClient",
}

const PageActions = ({ client: { email, phone }, edit }) => (
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

const Client = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_CLIENT_BY_ID, {
    variables: { id },
  })
  const [editClient] = useMutation(UPDATE_CLIENT)

  const [modalToShow, setModalToShow] = useState("")

  if (loading) {
    return "Loading..."
  }
  if (error) {
    return `Error!`
  }

  const { client } = data
  const { duration, cycle, managers } = client
  const fullName = getFullName(client)
  return (
    <>
      <div className="flex space-between bg-white rounded-lg px-10 mb-10">
        <div className="flex-grow py-10">
          <Title>{fullName}</Title>

          <p>
            Managers:{" "}
            {managers.map((manager) => (
              <Tag>{getFullName(manager)}</Tag>
            ))}
          </p>
          <p>Cycle: {cycle}</p>
          <p>Duration: {duration}</p>
          <PageActions client={client} edit={() => setModalToShow(MODALS.editClient)} />
        </div>
      </div>

      {modalToShow === MODALS.editClient && (
        <Modal
          title={`Edit ${getFullName(client)}`}
          onClose={() => setModalToShow("")}
          submitButtonText="Update"
        >
          {({ form }) => (
            <ClientFrom
              form={form}
              initialClient={{
                ...client,
                managerIds: client.managers.map((m) => m.id),
              }}
              onSubmit={(values) => editClient({ variables: { id: client.id, ...values } })}
            />
          )}
        </Modal>
      )}
    </>
  )
}

export default Client
