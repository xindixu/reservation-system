import React from "react"
import PropTypes from "prop-types"
import { capitalize } from "lodash"
import { Form, Input, Select, Button, Row, Col } from "antd"
import { FORM } from "lib/common-types"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"

const { Option } = Select
const ROLES = ["CLIENT", "MANAGER", "ADMIN"]
const SignUpForm = ({ form, onSubmit }) => {
  return (
    <Form
      {...defaultFormLayout}
      form={form}
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
      <Form.Item label="Email" name="email" rules={[{ required: true }, { type: "email" }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password type="password" />
      </Form.Item>
      <Form.Item label="Role" name="role" rules={[{ required: true }]}>
        <Select>
          {Object.keys(ROLES).map((key) => (
            <Option key={key} value={key}>
              {capitalize(ROLES[key])}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" block>
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

SignUpForm.propTypes = {
  form: PropTypes.shape(FORM).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SignUpForm
