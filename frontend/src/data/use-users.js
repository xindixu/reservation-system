import { useLazyQuery, useMutation } from "@apollo/client"
import { ME, SIGN_UP } from "graphql/user"

const useUser = () => {
  const [signUp, { error: signUpError }] = useMutation(SIGN_UP)
  return { signUp, signUpError }
}

export default useUser
