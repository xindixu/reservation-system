export const validatePhone = (phone) => /\d{10}/.test(phone)

export const phone = {
  validator: validatePhone,
  message: "{VALUE} is not a valid 10 digit phone number.",
}
