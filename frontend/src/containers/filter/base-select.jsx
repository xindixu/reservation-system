import React from "react"
import PropTypes from "prop-types"
import { Form, Select, Spin } from "antd"

const { Option } = Select

const Base = ({ t, label, name, onFocus, loading, options, itemToString, mode, onInputChange }) => (
  <Form.Item label={label} name={name}>
    <Select
      allowClear
      showSearch
      onFocus={onFocus}
      mode={mode}
      placeholder={t("placeholder.multipleSelect")}
      filterOption={false}
      notFoundContent={loading ? <Spin size="small" /> : null}
      onSearch={onInputChange}
    >
      {options?.map((opt) =>
        opt ? (
          <Option key={opt.id} value={opt.id}>
            {itemToString(opt)}
          </Option>
        ) : null
      )}
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
  onInputChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  t: PropTypes.func.isRequired,
}

export default Base
