import React from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"
import { Form, Input, Select, Row, Col } from "antd"
import { GET_ALL_TEAMS } from "graphql/teams"
import { MANAGER } from "lib/commonTypes"

const ManagerForm = ({ initialManager, manager, setManager }) => {
  const { firstName, lastName, jobTitle, email, phone, teamId } = initialManager
  const { data } = useQuery(GET_ALL_TEAMS)
  return (
    <Form
      labelCol={{
        span: 24,
      }}
      layout="vertical"
      size="middle"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="First Name">
            <Input
              type="text"
              defaultValue={firstName}
              onChange={(e) => setManager({ ...manager, firstName: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name">
            <Input
              type="text"
              defaultValue={lastName}
              onChange={(e) => setManager({ ...manager, lastName: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Job Title">
        <Input
          type="text"
          defaultValue={jobTitle}
          onChange={(e) => setManager({ ...manager, jobTitle: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          type="email"
          defaultValue={email}
          onChange={(e) => setManager({ ...manager, email: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Phone">
        <Input
          type="tel"
          defaultValue={phone}
          onChange={(e) => setManager({ ...manager, phone: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Team">
        <Select defaultValue={teamId} onChange={(e) => setManager({ ...manager, teamId: e })}>
          {data?.teams.map(({ id, name }) => (
            <Select.Option value={id} key={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

ManagerForm.defaultProps = {
  initialManager: {},
}
ManagerForm.propTypes = {
  initialManager: PropTypes.shape(MANAGER),
  manager: PropTypes.object.isRequired,
  setManager: PropTypes.func.isRequired,
}

export default ManagerForm
