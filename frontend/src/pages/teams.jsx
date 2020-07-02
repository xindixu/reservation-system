import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Button, Card, Col, Row } from "antd"
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons"
import { GET_ALL_TEAMS, CREATE_TEAM } from "graphql/teams"
import Modal from "components/modal"
import TeamForm from "components/team-form"
import FAButton from "components/floating-action-button"

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
      <Row justify="space-between" gutter={[16, 16]}>
        {data.teams.map(({ id, name, description, email, phone, managersCount }) => (
          <Col sm={24} md={12} lg={6} key={id}>
            <Link to={`/team/${id}`}>
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
                {description}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
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
