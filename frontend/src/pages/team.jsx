import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Typography, Button, Space } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import AddManagerToTeam from "components/forms/add-manager-to-team"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import ManagersGrid from "components/grid/managers-grid"
import TeamForm from "components/forms/team-form"
import useTeams from "data/use-teams"

const { Title } = Typography

const PageActions = ({ team: { email, phone }, edit }) => (
  <Space size="middle" className="py-4">
    <Button key="edit" type="primary" icon={<EditOutlined />} onClick={edit}>
      Manage
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
  addManagerToTeam: "addManagerToTeam",
  editTeam: "editTeam",
}

const Team = () => {
  const { id } = useParams()
  const { team, errorTeam, loadingTeam, loadTeam, editTeam, addManagers } = useTeams(id)

  useEffect(() => {
    loadTeam()
  }, [])

  const [numOfManagersToAdd, setNumOfManagersToAdd] = useState(0)
  const [modalToShow, setModalToShow] = useState("")

  if (loadingTeam) {
    return "Loading..."
  }
  if (errorTeam) {
    return `Error! ${errorTeam.message}`
  }

  const { name, description, managers } = team

  return (
    <>
      <div className="flex space-between bg-white rounded-lg p-10 mb-10">
        <div className="flex-grow ">
          <Title>{name}</Title>
          <p>{description}</p>
          <PageActions team={team} edit={() => setModalToShow(MODALS.editTeam)} />
        </div>
      </div>

      <ManagersGrid managers={managers} />

      {modalToShow === MODALS.editTeam && (
        <Modal title={`Edit ${name}`} onClose={() => setModalToShow("")} submitButtonText="Update">
          {({ form }) => (
            <TeamForm
              initialTeam={team}
              form={form}
              onSubmit={(values) => {
                editTeam({ variables: { id, ...values } })
              }}
            />
          )}
        </Modal>
      )}
      {modalToShow === MODALS.addManagerToTeam && (
        <Modal
          title={`Add Manager To ${name}`}
          onClose={() => setModalToShow("")}
          submitButtonText={`Add ${numOfManagersToAdd} Managers`}
        >
          {({ form }) => (
            <AddManagerToTeam
              initialTeam={team}
              form={form}
              setNumOfManagersToAdd={setNumOfManagersToAdd}
              onSubmit={(values) => {
                addManagers({ variables: { id, ...values } })
              }}
            />
          )}
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addManagerToTeam)}
        ariaLabel="add manager to team"
        rotate={modalToShow === MODALS.addManagerToTeam}
      />
    </>
  )
}

export default Team
