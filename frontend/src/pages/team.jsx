import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Typography, Button, Card, Col, Row, Space } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import { GET_TEAM_BY_ID } from "graphql/teams"
import FAButton from "components/floating-action-button"

const { Title } = Typography
const { Meta } = Card

const ManagersGrid = ({ managers }) => (
  <Row justify="space-between" gutter={[16, 16]}>
    {managers.map(({ id, firstName, lastName, email, phone }) => (
      <Col sm={24} md={12} lg={6} key={id}>
        <Link to={`/manager/${id}`}>
          <Card
            cover={
              <img
                alt={`${firstName} ${lastName}`}
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
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
          >
            <Meta title={`${firstName} ${lastName}`} />
          </Card>
        </Link>
      </Col>
    ))}
  </Row>
)

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
      <Title>{name}</Title>
      <p>{description}</p>
      <PageActions team={team} />
      <ManagersGrid managers={managers} />
      <FAButton
        onClick={() => setModalToShow(MODALS.addManager)}
        ariaLabel="new manager"
        rotate={modalToShow}
      />
    </>
  )
}

Team.propTypes = {}

export default Team
