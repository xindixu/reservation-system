import React from "react"
import PropTypes from "prop-types"
import { Form, Select } from "antd"

const { Option } = Select

const Base = ({ label, name, onFocus, loading, options, itemToString }) => (
  <Form.Item label={label} name={name}>
    <Select
      allowClear
      onFocus={onFocus}
      mode="multiple"
      placeholder={`Select one or multiple ${label}`}
      optionFilterProp="children"
      filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
      loading={loading}
    >
      {options &&
        options.map((opt) => (
          <Option key={`${name}-${opt.id}`} value={opt.id}>
            {itemToString(opt)}
          </Option>
        ))}
    </Select>
  </Form.Item>
)

Base.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  itemToString: PropTypes.func.isRequired,
}

export default Base
