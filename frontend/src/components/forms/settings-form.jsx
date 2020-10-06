import React from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import { capitalize } from "lodash"
import { Form, Input, Select, Button } from "antd"
import { USER } from "lib/common-types"
import { LOCALES, defaultValidateMessages, horizontalFormLayout } from "lib/constants"

const { Option } = Select

const SettingsForm = ({ initialUser, onSubmit, errors, loading }) => {
  const { t } = useTranslation()
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
        label={t("common.email")}
        name="email"
        rules={[{ type: "email" }]}
        validateStatus={errors?.email && "error"}
        help={errors?.email}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label={t("common.password")}
        name="password"
        validateStatus={errors?.password && "error"}
        help={errors?.password}
      >
        <Input.Password type="password" />
      </Form.Item>
      <Form.Item label={t("common.language")} name="locale">
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
          {t("common.update")}
        </Button>
      </Form.Item>
    </Form>
  )
}

SettingsForm.defaultProps = {
  errors: {},
  initialUser: {},
}

SettingsForm.propTypes = {
  errors: PropTypes.object,
  initialUser: PropTypes.shape(USER),
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SettingsForm
