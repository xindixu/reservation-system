import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils"
import { defaultFieldResolver } from "graphql"
import { ensureSignOut } from "../../utils/auth"

const guestDirectiveTransformer = (schema, directiveName) =>
  mapSchema(schema, {
    // Executes once for each object field definition in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const [guestDirective] = getDirective(schema, fieldConfig, directiveName) || []

      if (guestDirective) {
        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig

        fieldConfig.resolve = async function (...args) {
          const [, , context] = args
          ensureSignOut(context.req)
          return resolve.apply(this, args)
        }
        return fieldConfig
      }
    },
  })

export default guestDirectiveTransformer
