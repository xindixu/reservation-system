import { UserInputError } from "apollo-server-express"

const toCursorHash = (object) => {
  try {
    return Buffer.from(JSON.stringify(object)).toString("base64")
  } catch (error) {
    throw new UserInputError("Invalid cursor")
  }
}

const fromCursorHash = (string) => {
  try {
    return JSON.parse(Buffer.from(string, "base64").toString())
  } catch (error) {
    throw new UserInputError("Invalid cursor")
  }
}

export { toCursorHash, fromCursorHash }
