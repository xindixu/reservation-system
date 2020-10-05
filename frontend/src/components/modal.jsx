import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import { Button, Modal as AntdModal, Form } from "antd"

const Modal = ({ title, onClose, onDelete, children, submitButtonText, deleteButtonText }) => {
  const { t } = useTranslation()

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
          {t("common.cancel")}
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then(() => {
                form.submit()
                onClose()
              })
              .catch()
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
  onDelete: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,

  submitButtonText: PropTypes.string,
  deleteButtonText: PropTypes.string,
}

export default Modal
