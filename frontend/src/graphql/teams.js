import { gql } from "apollo-boost"
import { MANAGER, TEAM } from "./fragments"

export const GET_ALL_TEAMS = gql`
  query Teams {
    teams {
      ...ExtendedTeam
    }
  }
  ${TEAM.extended}
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
  ${TEAM.extended}
  ${MANAGER.extended}
`

export const CREATE_TEAM = gql`
  mutation CreateTeam($name: String!, $email: String, $phone: String, $description: String) {
    createTeam(input: { name: $name, email: $email, phone: $phone, description: $description }) {
      ...ExtendedTeam
    }
  }
  ${TEAM.extended}
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
      ...ExtendedTeam
      managers {
        ...ExtendedManager
      }
    }
  }
  ${TEAM.extended}
  ${MANAGER.extended}
`

export const ADD_MANAGERS_TO_TEAM = gql`
  mutation AddManagersToTeam($id: ID!, $managerIds: [ID!]!) {
    addManagersToTeam(input: { id: $id, managerIds: $managerIds }) {
      ...ExtendedTeam
      managers {
        ...ExtendedManager
      }
    }
  }
  ${TEAM.extended}
  ${MANAGER.extended}
`
