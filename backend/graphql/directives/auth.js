import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils"
import { defaultFieldResolver } from "graphql"
import { ensureSignIn } from "../../utils/auth"

const authDirectiveTransformer = (schema, directiveName) =>
  mapSchema(schema, {
    // Executes once for each object field definition in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const [authDirective] = getDirective(schema, fieldConfig, directiveName) || []

      if (authDirective) {
        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig

        fieldConfig.resolve = async function (...args) {
          const [, , context] = args
          // ensureSignIn(context.req)
          return resolve.apply(this, args)
        }
        return fieldConfig
      }
    },
  })

export default authDirectiveTransformer
