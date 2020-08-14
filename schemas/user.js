import Joi from "@hapi/joi"

export default Joi.object({
  email: Joi.string().email().required().label("Email"),

  // ref: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .$.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .rule({
      message: `"Password" must have at least one letter and one number`,
    })
    .label("Password"),
})
