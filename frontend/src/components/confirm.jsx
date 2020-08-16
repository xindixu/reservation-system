import React from "react"

import { Modal } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"

const { confirm } = Modal

const getConfirm = ({ type = "delete", title = "Are you sure", content, onConfirm = () => {} }) => {
  if (type === "delete") {
    return confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      content,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        onConfirm()
      },
      onCancel() {},
    })
  }
  return null
}

export default getConfirm
