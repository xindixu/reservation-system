import React from "react"
import PropTypes from "prop-types"
import { Form, Input } from "antd"
import { FORM } from "lib/common-types"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"

const SignInForm = ({ form, onSubmit, errors }) => (
  <Form
    {...defaultFormLayout}
    form={form}
    validateMessages={defaultValidateMessages}
    onFinish={onSubmit}
  >
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
  </Form>
)

SignInForm.defaultProps = {
  errors: {},
}

SignInForm.propTypes = {
  form: PropTypes.shape(FORM).isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
}

export default SignInForm
