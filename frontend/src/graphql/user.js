import { gql } from "apollo-boost"

export const ME = gql`
  query Me {
    me {
      id
      email
      role
    }
  }
`

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!, $role: Role!) {
    signUp(input: { email: $email, password: $password, role: $role }) {
      id
      email
      role
      accessToken
      refreshToken
    }
  }
`
