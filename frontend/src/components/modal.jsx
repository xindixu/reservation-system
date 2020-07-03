import React from "react"
import PropTypes from "prop-types"
import { Button, Modal as AntdModal } from "antd"

const Modal = ({ title, onClose, onSubmit, children, primaryButtonText }) => (
  <AntdModal
    title={title}
    visible
    footer={[
      <Button key="cancel" type="default" onClick={onClose}>
        Cancel
      </Button>,
      <Button
        key="submit"
        type="primary"
        onClick={() => {
          onSubmit()
          onClose()
        }}
      >
        {primaryButtonText}
      </Button>,
    ]}
    onCancel={onClose}
  >
    {children}
  </AntdModal>
)

Modal.defaultProps = {
  primaryButtonText: "Create",
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  primaryButtonText: PropTypes.string,
}

export default Modal
