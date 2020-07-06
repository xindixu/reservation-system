import React from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"
import { Form, Input, Select, Row, Col } from "antd"
import { GET_ALL_TEAMS } from "graphql/teams"
import { MANAGER, FORM } from "lib/commonTypes"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"

const ManagerForm = ({ form, initialManager, onSubmit }) => {
  const { data } = useQuery(GET_ALL_TEAMS)
  return (
    <Form
      {...defaultFormLayout}
      form={form}
      initialValues={initialManager}
      validateMessages={defaultValidateMessages}
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Job Title" name="jobTitle" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true }, { type: "email" }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
        <Input type="tel" />
      </Form.Item>
      <Form.Item label="Team" name="teamId" rules={[{ required: true }]}>
        <Select>
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
  onSubmit: PropTypes.func.isRequired,
}

export default ManagerForm
