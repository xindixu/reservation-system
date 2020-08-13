import jwt from "jsonwebtoken"
import { jwtHashKey } from "../constants.js"

export default function (req, res, next) {
  const authHeader = req.get("Authorization")
  if (!authHeader) {
    req.isAuth = false
    return next()
  }

  const token = authHeader.split(" ")[1] // Bearer fsajfklsdjfafljkljhg
  if (!token) {
    req.isAuth = false
    return next()
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(token, jwtHashKey)
  } catch (error) {
    req.isAuth = false
    return next
  }
  if (!decodedToken) {
    req.isAuth = false
    return next()
  }
  req.isAuth = true
  req.userId = decodedToken.userId
  return next()
}
