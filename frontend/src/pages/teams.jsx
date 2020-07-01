import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Card, Col, Row, Button } from "antd"
import { PhoneOutlined, MailOutlined } from "@ant-design/icons"

import { GET_ALL_TEAMS, CREATE_TEAM } from "graphql/teams"
import Modal from "components/modal"
import TeamForm from "components/team-form"
import FAButton from "components/floating-action-button"

const MODALS = {
  addTeam: "addTeam",
}

const Teams = () => {
  const { loading, error, data } = useQuery(GET_ALL_TEAMS)
  const [addTeam] = useMutation(CREATE_TEAM)
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
        {data.teams.map(({ id, name, description, email, phone, managers }) => (
          <Col sm={24} md={12} lg={6} key={id}>
            <Card
              title={name}
              hoverable
              actions={[
                <Button
                  key="email"
                  type="link"
                  size="small"
                  icon={<MailOutlined />}
                  href={`mailto:${email}`}
                />,
                <Button
                  key="phone"
                  type="link"
                  size="small"
                  icon={<PhoneOutlined />}
                  href={`tel:${phone}`}
                />,
              ]}
            >
              {description}
            </Card>
          </Col>
        ))}
      </Row>
      {modalToShow === MODALS.addTeam && (
        <Modal
          title="Create New Team"
          onClose={() => setModalToShow("")}
          onSubmit={() => {
            console.log(team)
            addTeam({ variables: team })
          }}
        >
          <TeamForm team={team} setTeam={setTeam} />
        </Modal>
      )}
      <FAButton onClick={() => setModalToShow(MODALS.addTeam)}>New Team</FAButton>
    </>
  )
}

export default Teams
