import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Typography, Button, Space } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import { GET_MANAGER_BY_ID, UPDATE_MANAGER } from "graphql/managers"
import { getFullName, getDefaultAvatar } from "lib/utils"
import Modal from "components/modal"
import ManagerForm from "components/forms/manager-form"
import FAButton from "components/floating-action-button"
import ClientsGrid from "components/grid/clients-grid"

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
}

const Manager = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_MANAGER_BY_ID, {
    variables: { id },
  })

  const [editManager] = useMutation(UPDATE_MANAGER)

  const [modalToShow, setModalToShow] = useState("")
  const [updatedManager, setUpdatedManager] = useState(data?.manager)

  if (loading) {
    return "Loading..."
  }
  if (error) {
    return `Error!`
  }

  const { manager } = data
  const { firstName, jobTitle, team, clients } = manager

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
      <ClientsGrid clients={clients} />

      {modalToShow === MODALS.editManager && (
        <Modal
          title={`Edit ${fullName}`}
          onClose={() => setModalToShow("")}
          primaryButtonText="Update"
          onSubmit={() => editManager({ variables: { id, ...updatedManager } })}
        >
          <ManagerForm
            initialValue={{ ...manager, teamId: manager.team.id }}
            manager={updatedManager}
            setManager={setUpdatedManager}
          />
        </Modal>
      )}

      <FAButton onClick={() => setModalToShow(MODALS.editManager)} ariaLabel="edit" />
    </>
  )
}

Manager.propTypes = {}

export default Manager
