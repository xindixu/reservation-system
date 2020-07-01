import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { Card, Col, Row, Button } from "antd"
import { PhoneOutlined, MailOutlined } from "@ant-design/icons"
import { GET_ALL_TEAMS } from "../graphql/teams"
import FAButton from "../components/floating-action-button"

const Teams = () => {
  const { loading, error, data } = useQuery(GET_ALL_TEAMS)

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
      <FAButton>New Team</FAButton>
    </>
  )
}

export default Teams
