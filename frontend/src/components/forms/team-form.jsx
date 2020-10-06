import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import { Form, Input } from "antd"
import { TEAM, FORM } from "lib/common-types"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"

const TeamForm = ({ initialTeam, form, onSubmit }) => {
  const { t } = useTranslation()

  return (
    <Form
      {...defaultFormLayout}
      form={form}
      initialValues={initialTeam}
      validateMessages={defaultValidateMessages}
      onFinish={onSubmit}
    >
      <Form.Item label={t("common.name")} name="name" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label={t("common.email")}
        name="email"
        rules={[{ required: true }, { type: "email" }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item label={t("common.phone")} name="phone" rules={[{ required: true }]}>
        <Input type="tel" />
      </Form.Item>
      <Form.Item label={t("common.description")} name="description" rules={[{ required: true }]}>
        <Input.TextArea rows={5} allowClear />
      </Form.Item>
    </Form>
  )
}

TeamForm.defaultProps = {
  initialTeam: {},
}

TeamForm.propTypes = {
  form: PropTypes.shape(FORM).isRequired,
  initialTeam: PropTypes.shape(TEAM),
  onSubmit: PropTypes.func.isRequired,
}

export default TeamForm
