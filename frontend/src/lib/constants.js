export const defaultValidateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required.",
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: "${label} is not a valid ${type}",
  },
}
export const defaultFormLayout = {
  labelCol: {
    span: 24,
  },
  layout: "vertical",
  size: "middle",
}

export const defaultTableSettings = {
  pagination: { showQuickJumper: true, defaultPageSize: 15 },
}
