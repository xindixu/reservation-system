import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Typography, Button, Space } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import AddManagerToTeam from "components/forms/add-manager-to-team"
import { GET_TEAM_BY_ID, UPDATE_TEAM } from "graphql/teams"
import { GET_ALL_MANAGERS } from "graphql/managers"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import ManagersGrid from "components/grid/managers-grid"
import TeamForm from "components/forms/team-form"

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
  const [updatedTeam, setUpdatedTeam] = useState({})
  const [modalToShow, setModalToShow] = useState("")
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_TEAM_BY_ID, {
    variables: { id },
  })

  const [editTeam] = useMutation(UPDATE_TEAM, {
    update: (cache, { data: { updateTeam } }) => {
      const { team } = updateTeam
      const { managers } = cache.readQuery({ query: GET_ALL_MANAGERS })

      managers.forEach((manager) => {
        if (team.managers.some((m) => m.id === manager.id && m.teamId !== team.id)) {
          manager.team = team
        }
      })
      cache.writeQuery({
        query: GET_ALL_MANAGERS,
        data: {
          managers,
        },
      })
    },
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
          <PageActions team={team} edit={() => setModalToShow(MODALS.editTeam)} />
        </div>
      </div>

      <ManagersGrid managers={managers} />

      {modalToShow === MODALS.addManagerToTeam && (
        <Modal
          title={`Add Manager To ${name}`}
          onClose={() => setModalToShow("")}
          primaryButtonText={`Add ${updatedTeam.managerIds?.length || 0} Managers`}
          onSubmit={() => {
            editTeam({ variables: { id, ...updatedTeam } })
            setUpdatedTeam({})
          }}
        >
          <AddManagerToTeam
            initialTeam={team}
            team={{ id, ...updatedTeam }}
            setTeam={setUpdatedTeam}
          />
        </Modal>
      )}
      {modalToShow === MODALS.editTeam && (
        <Modal
          title={`Edit ${name}`}
          onClose={() => setModalToShow("")}
          primaryButtonText="Update"
          onSubmit={() => {
            editTeam({ variables: { id, ...updatedTeam } })
            setUpdatedTeam({})
          }}
        >
          <TeamForm initialTeam={team} team={updatedTeam} setTeam={setUpdatedTeam} />
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

export default Team
