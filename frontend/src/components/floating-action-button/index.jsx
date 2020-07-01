import React from "react"
import PropTypes from "prop-types"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { FAButtonPosition } from "./styles"

const FAButton = ({ onClick, children, icon }) => (
  <FAButtonPosition>
    <Button type="primary" shape="round" icon={icon} size="large" onClick={onClick}>
      {children}
    </Button>
  </FAButtonPosition>
)
FAButton.defaultProps = {
  icon: <PlusOutlined />,
}

FAButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
}

export default FAButton
