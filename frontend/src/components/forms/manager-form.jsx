import React from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"
import { Form, Input, Select, Row, Col } from "antd"
import { GET_ALL_TEAMS } from "graphql/teams"
import { MANAGER, FORM } from "lib/commonTypes"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"

const ManagerForm = ({ form, initialManager }) => {
  const { firstName, lastName, jobTitle, email, phone, teamId } = initialManager
  const { data } = useQuery(GET_ALL_TEAMS)
  return (
    <Form
      form={form}
      scrollToFirstError
      {...defaultFormLayout}
      validateMessages={defaultValidateMessages}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
            <Input type="text" defaultValue={firstName} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
            <Input type="text" defaultValue={lastName} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Job Title" name="jobTitle" rules={[{ required: true }]}>
        <Input type="text" defaultValue={jobTitle} />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input type="email" defaultValue={email} />
      </Form.Item>
      <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
        <Input type="tel" defaultValue={phone} />
      </Form.Item>
      <Form.Item label="Team" name="teamId" rules={[{ required: true }]}>
        <Select defaultValue={teamId}>
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
  form: PropTypes.shape(FORM).isRequired,
  initialManager: PropTypes.shape(MANAGER),
}

export default ManagerForm
