import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import { Form, Input, Select, Row, Col } from "antd"
import { MANAGER, FORM } from "lib/common-types"
import { isFirstNameFirst } from "lib/utils"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"
import useTeams from "data/use-teams"

const ManagerForm = ({ form, initialManager, onSubmit }) => {
  const { t } = useTranslation()

  const { teams, loadingTeams, loadTeams } = useTeams()

  useEffect(() => {
    loadTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const firstName = (
    <Col span={12}>
      <Form.Item label={t("common.firstName")} name="firstName" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
    </Col>
  )

  const lastName = (
    <Col span={12}>
      <Form.Item label={t("common.lastName")} name="lastName" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
    </Col>
  )
  return (
    <Form
      {...defaultFormLayout}
      form={form}
      initialValues={initialManager}
      validateMessages={defaultValidateMessages}
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        {isFirstNameFirst ? (
          <>
            {firstName}
            {lastName}
          </>
        ) : (
          <>
            {lastName}
            {firstName}
          </>
        )}
      </Row>
      <Form.Item label={t("common.jobTitle")} name="jobTitle" rules={[{ required: true }]}>
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
      <Form.Item label={t("term.team")} name="teamId" rules={[{ required: true }]}>
        <Select>
          {loadingTeams ||
            teams.map(({ id, name }) => (
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
