import { SchemaDirectiveVisitor } from "apollo-server-express"

import { defaultFieldResolver } from "graphql"
import { ensureSignIn } from "../../utils/auth.js"

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const [, , context] = args
      ensureSignIn(context.req)
      return resolve.apply(this, args)
    }
  }
}

export default AuthDirective
