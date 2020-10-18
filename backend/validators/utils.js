import Joi from "./joi"

export const email = Joi.string().email().trim().required().label("Email")
export const description = Joi.string().max(150).label("Description")
export const objectId = Joi.objectId().label("Object ID")
