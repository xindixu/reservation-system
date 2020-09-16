import { gql } from "@apollo/client"
import { CLIENT, MANAGER, TEAM } from "./fragments"

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
        team {
          ...BasicTeam
        }
        manager {
          ...BasicManager
        }
        client {
          ...BasicClient
        }
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
  ${TEAM.basic}
  ${MANAGER.basic}
  ${CLIENT.basic}
`

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      ... on User {
        id
        email
        roleType
        team {
          ...BasicTeam
        }
        manager {
          ...BasicManager
        }
        client {
          ...BasicClient
        }
        accessToken
        refreshToken
      }
      ... on SignInInvalidInputError {
        email
        password
      }
    }
  }
  ${TEAM.basic}
  ${MANAGER.basic}
  ${CLIENT.basic}
`

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`
