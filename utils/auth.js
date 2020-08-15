import jwt from "jsonwebtoken"
import { jwtHashKey } from "../constants.js"

export const getUser = (authHeader) => {
  if (!authHeader) {
    return null
  }

  const token = authHeader.split(" ")[1] // Bearer fsajfklsdjfafljkljhg
  if (!token) {
    return null
  }

  try {
    return jwt.verify(token, jwtHashKey)
  } catch (error) {
    return null
  }
}
