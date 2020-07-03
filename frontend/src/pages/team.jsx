import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"
import { Typography, Button, Space } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import AddManagerToTeam from "components/forms/add-manager-to-team"
import { GET_TEAM_BY_ID } from "graphql/teams"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import ManagersGrid from "components/grid/managers-grid"

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
  const [updatedTeam, setUpdatedTeam] = useState({ managers: [] })
  const [modalToShow, setModalToShow] = useState("")
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_TEAM_BY_ID, {
    variables: { id },
  })

  if (loading) {
    return "Loading..."
  }
  if (error) {
    return `Error! ${error.message}`
  }

  const { team } = data
  const { name, description, managers } = team

  return (
    <>
      <div className="flex space-between bg-white rounded-lg p-10 mb-10">
        <div className="flex-grow ">
          <Title>{name}</Title>
          <Title level={4}>{description}</Title>
          <PageActions team={team} edit={() => setModalToShow(MODALS.editTeam)} />
        </div>
      </div>

      <ManagersGrid managers={managers} />

      {modalToShow === MODALS.addManagerToTeam && (
        <Modal
          title={`Add Manager To ${name}`}
          onClose={() => setModalToShow("")}
          primaryButtonText={`Add ${updatedTeam.managers.length} Managers`}
          // onSubmit={() => manager({ variables: manager })}
        >
          <AddManagerToTeam team={updatedTeam} setTeam={setUpdatedTeam} />
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addManagerToTeam)}
        ariaLabel="new manager"
        rotate={modalToShow === MODALS.addManagerToTeam}
      />
    </>
  )
}

Team.propTypes = {}

export default Team
