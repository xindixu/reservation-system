import React from "react"
import PropTypes from "prop-types"
import { Button, Modal as AntdModal } from "antd"

const Modal = ({ title, onClose, onSubmit, children }) => (
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
        Create
      </Button>,
    ]}
    onCancel={onClose}
  >
    {children}
  </AntdModal>
)

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal
