import { gql } from "apollo-boost"
import { FRAGMENT_MANAGER, FRAGMENT_TEAM } from "./fragments"

export const GET_ALL_TEAMS = gql`
  query Teams {
    teams {
      ...ExtendedTeam
    }
  }
  ${FRAGMENT_TEAM}
`

export const GET_TEAM_BY_ID = gql`
  query Team($id: ID!) {
    team(id: $id) {
      ...ExtendedTeam
      managers {
        ...ExtendedManager
      }
    }
  }
  ${FRAGMENT_TEAM}
  ${FRAGMENT_MANAGER}
`

export const CREATE_TEAM = gql`
  mutation CreateTeam($name: String!, $email: String, $phone: String, $description: String) {
    createTeam(input: { name: $name, email: $email, phone: $phone, description: $description }) {
      team {
        ...ExtendedTeam
      }
    }
  }
  ${FRAGMENT_TEAM}
`

export const UPDATE_TEAM = gql`
  mutation UpdateTeam(
    $id: ID!
    $name: String
    $email: String
    $phone: String
    $description: String
  ) {
    updateTeam(
      input: { id: $id, name: $name, email: $email, phone: $phone, description: $description }
    ) {
      team {
        ...ExtendedTeam
        managers {
          ...ExtendedManager
        }
      }
    }
  }
  ${FRAGMENT_TEAM}
  ${FRAGMENT_MANAGER}
`

export const ADD_MANAGERS_TO_TEAM = gql`
  mutation AddManagersToTeam($id: ID!, $managerIds: [ID!]!) {
    addManagersToTeam(input: { id: $id, managerIds: $managerIds }) {
      team {
        ...ExtendedTeam
        managers {
          ...ExtendedManager
        }
      }
    }
  }
  ${FRAGMENT_TEAM}
  ${FRAGMENT_MANAGER}
`
