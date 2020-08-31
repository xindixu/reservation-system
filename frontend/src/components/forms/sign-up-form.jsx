import React from "react"
import PropTypes from "prop-types"
import { capitalize } from "lodash"
import { Form, Input, Select, Button, Row, Col } from "antd"
import { FORM } from "lib/common-types"
import { ROLES, defaultValidateMessages, defaultFormLayout } from "lib/constants"

const { Option } = Select
const SignUpForm = ({ form, onSubmit, errors }) => {
  return (
    <Form
      {...defaultFormLayout}
      form={form}
      validateMessages={defaultValidateMessages}
      onFinish={onSubmit}
    >
      {/* <Row gutter={16}>
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
      </Row> */}
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true }, { type: "email" }]}
        validateStatus={errors?.email && "error"}
        help={errors?.email}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true }]}
        validateStatus={errors?.password && "error"}
        help={errors?.password}
      >
        <Input.Password type="password" />
      </Form.Item>
      <Form.Item label="Role" name="role" rules={[{ required: true }]}>
        <Select>
          {ROLES.map((role) => (
            <Option key={role} value={role}>
              {capitalize(role)}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

SignUpForm.defaultProps = {
  errors: {},
}

SignUpForm.propTypes = {
  form: PropTypes.shape(FORM).isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
}

export default SignUpForm
