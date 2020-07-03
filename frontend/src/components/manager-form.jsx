import React from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"
import { Form, Input, Select, Row, Col } from "antd"
import { GET_ALL_TEAMS } from "graphql/teams"

const ManagerForm = ({ initialValue, manager, setManager }) => {
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
              defaultValue={initialValue.firstName}
              onChange={(e) => setManager({ ...manager, firstName: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name">
            <Input
              type="text"
              defaultValue={initialValue.lastName}
              onChange={(e) => setManager({ ...manager, lastName: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Job Title">
        <Input
          type="text"
          defaultValue={initialValue.jobTitle}
          onChange={(e) => setManager({ ...manager, jobTitle: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          type="email"
          defaultValue={initialValue.email}
          onChange={(e) => setManager({ ...manager, email: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Phone">
        <Input
          type="tel"
          defaultValue={initialValue.phone}
          onChange={(e) => setManager({ ...manager, phone: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Team">
        <Select
          defaultValue={initialValue.teamId}
          onChange={(teamId) => setManager({ ...manager, teamId })}
        >
          {data
            ? data.teams.map(({ id, name }) => (
                <Select.Option value={id} key={id}>
                  {name}
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
    </Form>
  )
}

ManagerForm.propTypes = {
  initialValue: PropTypes.object.isRequired,
  manager: PropTypes.object.isRequired,
  setManager: PropTypes.func.isRequired,
}

export default ManagerForm
