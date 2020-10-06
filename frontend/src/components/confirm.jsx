import React from "react"
import { Modal } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import i18n from "locales/index"

const { confirm } = Modal

const getConfirm = ({ type = "delete", title = "", content, onConfirm = () => {} }) => {
  if (type === "delete") {
    return confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      content,
      okText: i18n.t("common.true"),
      okType: "danger",
      cancelText: i18n.t("common.false"),
      onOk() {
        onConfirm()
      },
      onCancel() {},
    })
  }
  return null
}

export default getConfirm
