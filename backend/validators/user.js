import Joi from "@hapi/joi"
import { email } from "./utils.js"

// ref: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
const password = Joi.string()
  .min(6)
  .max(30)
  .required()
  .$.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  .rule({
    message: `"Password" must have at least one letter and one number`,
  })
  .label("Password")

export const signUp = Joi.object().keys({
  email,
  password,
})

export const signIn = Joi.object().keys({
  email,
  password,
})
