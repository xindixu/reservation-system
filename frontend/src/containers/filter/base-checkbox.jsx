import React from "react"
import PropTypes from "prop-types"
import { Form, Checkbox } from "antd"

const Base = ({ label, name }) => (
  <Form.Item label={label} name={name} valuePropName="checked">
    <Checkbox />
  </Form.Item>
)

Base.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Base
