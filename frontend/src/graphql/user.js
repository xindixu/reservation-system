import { gql } from "@apollo/client"

export const ME = gql`
  query Me {
    me {
      id
      email
      roleType
    }
  }
`

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!, $roleType: RoleType!) {
    signUp(input: { email: $email, password: $password, roleType: $roleType }) {
      ... on User {
        id
        email
        roleType
        accessToken
        refreshToken
      }
      ... on SignUpInvalidInputError {
        email
        password
        roleType
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
        roleType
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
