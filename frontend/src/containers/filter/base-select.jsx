import React from "react"
import PropTypes from "prop-types"
import { Form, Select } from "antd"

const { Option } = Select

const Base = ({ t, label, name, onFocus, loading, options, itemToString, mode }) => (
  <Form.Item label={label} name={name}>
    <Select
      allowClear
      showSearch
      onFocus={onFocus}
      mode={mode}
      placeholder={t("placeholder.multipleSelect")}
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

Base.defaultProps = {
  mode: "multiple",
}

Base.propTypes = {
  itemToString: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  t: PropTypes.func.isRequired,
}

export default Base
