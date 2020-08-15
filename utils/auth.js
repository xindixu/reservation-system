import jwt from "jsonwebtoken"

export const accessTokenAge = 60 * 60 * 60 * 2 // 2 hrs
export const refreshTokenAge = 60 * 60 * 60 * 24 * 7 // 7 days

export const createToken = ({ id, lastSeen }) => {
  const accessToken = jwt.sign({ userId: id, lastSeen }, process.env.JWT_ACCESS_TOKEN_HASH, {
    expiresIn: accessTokenAge,
  })

  const refreshToken = jwt.sign({ userId: id, lastSeen }, process.env.JWT_REFRESH_TOKEN_HASH, {
    expiresIn: refreshTokenAge,
  })

  return { accessToken, refreshToken }
}
