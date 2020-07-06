import React from "react"
import PropTypes from "prop-types"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { FAButtonPosition } from "./styles"

const FAButton = ({ onClick, ariaLabel, rotate, icon }) => (
  <FAButtonPosition rotate={rotate}>
    <Button type="primary" shape="circle" icon={icon} onClick={onClick} aria-label={ariaLabel} />
  </FAButtonPosition>
)

FAButton.defaultProps = {
  icon: <PlusOutlined />,
}

FAButton.propTypes = {
  rotate: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  icon: PropTypes.node,
}

export default FAButton
