import React from "react"
import { capitalize } from "lodash"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"

import { Form, Input, Select } from "antd"
import { FORM } from "lib/common-types"
import { ROLES, defaultValidateMessages, defaultFormLayout } from "lib/constants"

const { Option } = Select
const SignUpForm = ({ form, onSubmit, errors }) => {
  const { t } = useTranslation()

  return (
    <Form
      {...defaultFormLayout}
      form={form}
      validateMessages={defaultValidateMessages}
      onFinish={onSubmit}
    >
      <Form.Item
        label={t("common.email")}
        name="email"
        rules={[{ required: true }, { type: "email" }]}
        validateStatus={errors?.email && "error"}
        help={errors?.email}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label={t("common.password")}
        name="password"
        rules={[{ required: true }]}
        validateStatus={errors?.password && "error"}
        help={errors?.password}
      >
        <Input.Password type="password" />
      </Form.Item>
      <Form.Item label={t("common.role")} name="roleType" rules={[{ required: true }]}>
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
