import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Button, Card, Typography } from "antd"
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons"
import { GET_ALL_TEAMS, CREATE_TEAM } from "graphql/teams"
import Modal from "components/modal"
import TeamForm from "components/team-form"
import FAButton from "components/floating-action-button"

const { Paragraph } = Typography
const MODALS = {
  addTeam: "addTeam",
}

const Teams = () => {
  const { loading, error, data } = useQuery(GET_ALL_TEAMS)
  const [addTeam] = useMutation(CREATE_TEAM, {
    update: (cache, { data: { createTeam } }) => {
      const { team } = createTeam
      const { teams } = cache.readQuery({ query: GET_ALL_TEAMS })
      cache.writeQuery({
        query: GET_ALL_TEAMS,
        data: {
          teams: [...teams, team],
        },
      })
    },
  })
  const [team, setTeam] = useState()
  const [modalToShow, setModalToShow] = useState("")

  if (loading) {
    return "loading..."
  }
  if (error) {
    return `Error ${error.message}`
  }
  return (
    <>
      <div className="flex flex-wrap -mx-2 overflow-hidden">
        {data.teams.map(({ id, name, description, email, phone, managersCount }) => (
          <Link
            key={id}
            to={`/team/${id}`}
            className="my-2 px-2 w-full overflow-hidden sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/4"
          >
            <Card
              title={name}
              hoverable
              actions={[
                <Button
                  key="email"
                  type="link"
                  size="small"
                  icon={<MailOutlined />}
                  aria-label="email team"
                  href={`mailto:${email}`}
                />,
                <Button
                  key="phone"
                  type="link"
                  size="small"
                  icon={<PhoneOutlined />}
                  aria-label="call team"
                  href={`tel:${phone}`}
                />,
              ]}
              extra={
                <>
                  <UserOutlined alt="managers count" /> {managersCount}
                </>
              }
            >
              <Paragraph ellipsis={{ rows: 2 }}>{description}</Paragraph>
            </Card>
          </Link>
        ))}
      </div>
      {modalToShow === MODALS.addTeam && (
        <Modal
          title="Create New Team"
          onClose={() => setModalToShow("")}
          onSubmit={() => addTeam({ variables: team })}
        >
          <TeamForm team={team} setTeam={setTeam} />
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addTeam)}
        ariaLabel="new Team"
        rotate={modalToShow}
      />
    </>
  )
}

export default Teams
