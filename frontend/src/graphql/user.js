import { gql } from "@apollo/client"
import { CLIENT, MANAGER, TEAM, USER } from "./fragments"

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
        ...BasicUser
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
  ${USER.basic}
  ${TEAM.basic}
  ${MANAGER.basic}
  ${CLIENT.basic}
`

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      ... on User {
        ...BasicUser
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
  ${USER.basic}
  ${TEAM.basic}
  ${MANAGER.basic}
  ${CLIENT.basic}
`

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $email: String, $password: String, $locale: Locale) {
    updateUser(input: { id: $id, email: $email, password: $password, locale: $locale }) {
      ...BasicUser
    }
  }
  ${USER.basic}
`
