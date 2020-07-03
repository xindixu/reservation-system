import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"
import { Typography, Button, Space } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import { GET_TEAM_BY_ID } from "graphql/teams"
import Modal from "components/modal"
import ManagerForm from "components/manager-form"
import FAButton from "components/floating-action-button"
import ManagersGrid from "components/managers-grid"

const { Title } = Typography

const PageActions = ({ team: { email, phone } }) => (
  <Space size="middle" className="py-4">
    <Button key="edit" type="primary" icon={<EditOutlined />} onClick={() => {}}>
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
  addManager: "addManager",
}

const Team = () => {
  const [manager, setManager] = useState({})
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
          <p>{description}</p>
          <PageActions team={team} />
        </div>
      </div>

      <ManagersGrid managers={managers} />
      <FAButton
        onClick={() => setModalToShow(MODALS.addManager)}
        ariaLabel="new manager"
        rotate={modalToShow}
      />
      {modalToShow === MODALS.addManager && (
        <Modal
          title="Create New Manager"
          onClose={() => setModalToShow("")}
          // onSubmit={() => manager({ variables: manager })}
        >
          <ManagerForm manager={manager} setManager={setManager} />
        </Modal>
      )}
    </>
  )
}

Team.propTypes = {}

export default Team
