import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import { startCase } from "lodash"
import { useQuery } from "@apollo/client"
import { Form, Input, Select, Checkbox } from "antd"
import { SLOT, FORM } from "lib/common-types"
import { GET_ALL_MANAGERS } from "graphql/managers"
import { getFullName } from "lib/utils"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"

const SlotForm = ({ initialSlot, form, onSubmit }) => {
  const { t } = useTranslation()
  const { data } = useQuery(GET_ALL_MANAGERS)

  return (
    <Form
      {...defaultFormLayout}
      form={form}
      initialValues={{ shareable: false, ...initialSlot }}
      validateMessages={defaultValidateMessages}
      onFinish={onSubmit}
    >
      <Form.Item label={startCase(t("common.name"))} name="name" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
      <Form.Item label={startCase(t("common.description"))} name="description">
        <Input.TextArea rows={5} allowClear />
      </Form.Item>
      <Form.Item
        label={startCase(t("common.shareable"))}
        name="shareable"
        valuePropName="checked"
        rules={[{ required: true }]}
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        label={startCase(t("term.manager.plural"))}
        name="managerIds"
        rules={[{ required: true }]}
      >
        <Select mode="multiple">
          {data?.managers.map((manager) => (
            <Select.Option value={manager.id} key={manager.id}>
              {getFullName(manager)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

SlotForm.defaultProps = {
  initialSlot: {},
}

SlotForm.propTypes = {
  form: PropTypes.shape(FORM).isRequired,
  initialSlot: PropTypes.shape({
    ...SLOT,
    managerIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
}

export default SlotForm
