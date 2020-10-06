import i18n from "locales/index"

export const defaultValidateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: (name) => `${i18n.t("message.isRequired", { name: i18n.t(`common.${name}`) })}`,
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: (name) => `${i18n.t("message.isValidEmail", { name: i18n.t(`common.${name}`) })}`,
  },
}
export const defaultFormLayout = {
  labelCol: {
    span: 24,
  },
  layout: "vertical",
  size: "middle",
}

export const horizontalFormLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: { span: 20 },
  layout: "horizontal",
  size: "middle",
}

export const defaultTableSettings = {
  pagination: { showQuickJumper: true, defaultPageSize: 15 },
}

export const CLIENT = "CLIENT"
export const MANAGER = "MANAGER"
export const ADMIN = "ADMIN"

export const ROLES = [CLIENT, MANAGER, ADMIN]

export const LINK_BY_ROLE = {
  [CLIENT]: "client",
  [MANAGER]: "manager",
  [ADMIN]: "team",
}

export const LOCALES = [
  {
    value: "en_US",
    label: "English",
  },
  {
    value: "zh_CN",
    label: "Chinese (Simplified)",
  },
]
