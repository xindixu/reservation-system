import React from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"
import { Form, Input, Select, Checkbox } from "antd"
import { GET_ALL_MANAGERS } from "graphql/managers"
import { getFullName } from "lib/utils"
import { TEAM, FORM } from "lib/commonTypes"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"

const SlotForm = ({ initialSlot, form, onSubmit }) => {
  const { data } = useQuery(GET_ALL_MANAGERS)

  return (
    <Form
      {...defaultFormLayout}
      form={form}
      initialValues={initialSlot}
      validateMessages={defaultValidateMessages}
      onFinish={onSubmit}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea rows={5} allowClear />
      </Form.Item>
      <Form.Item
        label="Shareable"
        name="shareable"
        valuePropName="checked"
        rules={[{ required: true }]}
      >
        <Checkbox />
      </Form.Item>
      <Form.Item label="Manager" name="managerId" rules={[{ required: true }]}>
        <Select>
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
  initialSlot: PropTypes.shape(TEAM),
  onSubmit: PropTypes.func.isRequired,
}

export default SlotForm
