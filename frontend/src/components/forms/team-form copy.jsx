import React from "react"
import PropTypes from "prop-types"

import { Form, Input } from "antd"
import { TEAM, FORM } from "lib/commonTypes"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"

const SlotForm = ({ initialSlot, form, onSubmit }) => (
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
    <Form.Item label="Email" name="email" rules={[{ required: true }]}>
      <Input type="email" />
    </Form.Item>
    <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
      <Input type="tel" />
    </Form.Item>
    <Form.Item label="Description" name="description" rules={[{ required: true }]}>
      <Input.TextArea rows={5} allowClear />
    </Form.Item>
  </Form>
)

SlotForm.defaultProps = {
  initialSlot: {},
}

SlotForm.propTypes = {
  form: PropTypes.shape(FORM).isRequired,
  initialSlot: PropTypes.shape(TEAM),
  onSubmit: PropTypes.func.isRequired,
}

export default SlotForm
