import React from "react"
import PropTypes from "prop-types"
import { capitalize, isEqual } from "lodash"
import { Form, Input, Select, Button } from "antd"
import { USER } from "lib/common-types"
import { LOCALES, defaultValidateMessages, horizontalFormLayout } from "lib/constants"

const { Option } = Select
const SettingsForm = ({ initialUser, onSubmit, errors, loading }) => {
  const [form] = Form.useForm()

  return (
    <Form
      {...horizontalFormLayout}
      layout="horizontal"
      form={form}
      validateMessages={defaultValidateMessages}
      onFinish={onSubmit}
      initialValues={initialUser}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ type: "email" }]}
        validateStatus={errors?.email && "error"}
        help={errors?.email}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        validateStatus={errors?.password && "error"}
        help={errors?.password}
      >
        <Input.Password type="password" />
      </Form.Item>
      <Form.Item label="Language" name="locale">
        <Select>
          {LOCALES.map(({ label, value }) => (
            <Option key={value} value={value}>
              {capitalize(label)}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
        <Button type="primary" htmlType="submit" disabled={loading}>
          Update
        </Button>
      </Form.Item>
    </Form>
  )
}

SettingsForm.defaultProps = {
  initialUser: {},
  errors: {},
}

SettingsForm.propTypes = {
  initialUser: PropTypes.shape(USER),
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
}

export default SettingsForm
