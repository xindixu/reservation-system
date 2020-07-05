import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import { Button, Modal as AntdModal, Form } from "antd"

const Modal = ({
  title,
  onClose,
  onDelete,
  onSubmit,
  children,
  submitButtonText,
  deleteButtonText,
}) => {
  const [containerEl] = useState(() => document.getElementById("modal-root"))

  const [form] = Form.useForm()
  return (
    <AntdModal
      title={title}
      visible
      getContainer={containerEl}
      footer={[
        ...(onDelete
          ? [
              <Button
                className="float-left"
                key="delete"
                type="danger"
                onClick={() => {
                  onDelete()
                  onClose()
                }}
              >
                {deleteButtonText}
              </Button>,
            ]
          : []),
        <Button key="cancel" type="default" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            console.log("here")
            form
              .validateFields()
              .then((values) => {
                console.log(values)
                form.resetFields()
                onSubmit(values)
                onClose()
              })
              .catch((info) => console.log("Validate Failed:", info))
          }}
        >
          {submitButtonText}
        </Button>,
      ]}
      onCancel={onClose}
    >
      {typeof children === "function" ? children({ form }) : children}
    </AntdModal>
  )
}
Modal.defaultProps = {
  submitButtonText: "Create",
  deleteButtonText: "Delete",
  onDelete: null,
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  children: PropTypes.node.isRequired,
  submitButtonText: PropTypes.string,
  deleteButtonText: PropTypes.string,
}

export default Modal
