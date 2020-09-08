import { gql } from "@apollo/client"

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
      ... on User {
        id
        email
        role
        accessToken
        refreshToken
      }
      ... on SignUpInvalidInputError {
        email
        password
        role
      }
    }
  }
`

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      ... on User {
        id
        email
        role
        accessToken
        refreshToken
      }
      ... on SignInInvalidInputError {
        email
        password
      }
    }
  }
`
