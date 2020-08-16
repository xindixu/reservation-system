import { SchemaDirectiveVisitor } from "apollo-server-express"

import { defaultFieldResolver } from "graphql"
import { ensureSignOut } from "../../utils/auth.js"

class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const [, , context] = args
      ensureSignOut(context.req)
      return resolve.apply(this, args)
    }
  }
}

export default GuestDirective
