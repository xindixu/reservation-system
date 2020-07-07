import { gql } from "apollo-boost"
import { FRAGMENT_MANAGER, FRAGMENT_CLIENT } from "./fragments"

export const GET_ALL_MANAGERS = gql`
  query Managers {
    managers {
      ...ExtendedManager
      team {
        id
      }
    }
  }
  ${FRAGMENT_MANAGER}
`

export const GET_MANAGER_BY_ID = gql`
  query Manager($id: ID!) {
    manager(id: $id) {
      ...ExtendedManager
      team {
        id
        name
      }
      clients {
        firstName
        lastName
        cycle
        duration
      }
    }
  }
  ${FRAGMENT_MANAGER}
`

export const CREATE_MANAGER = gql`
  mutation CreateManager(
    $firstName: String!
    $lastName: String!
    $jobTitle: String!
    $email: String!
    $phone: String!
    $teamId: ID!
    $clientIds: [ID!]
  ) {
    createManager(
      input: {
        firstName: $firstName
        lastName: $lastName
        jobTitle: $jobTitle
        email: $email
        phone: $phone
        teamId: $teamId
        clientIds: $clientIds
      }
    ) {
      manager {
        ...ExtendedManager
        team {
          id
        }
      }
    }
  }
  ${FRAGMENT_MANAGER}
`

export const UPDATE_MANAGER = gql`
  mutation UpdateManager(
    $id: ID!
    $firstName: String
    $lastName: String
    $jobTitle: String
    $email: String
    $phone: String
    $teamId: ID
    $clientIds: [ID!]
  ) {
    updateManager(
      input: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        jobTitle: $jobTitle
        email: $email
        phone: $phone
        teamId: $teamId
        clientIds: $clientIds
      }
    ) {
      manager {
        ...ExtendedManager
        team {
          id
          name
        }
        clients {
          ...ExtendedClient
        }
      }
    }
  }
  ${FRAGMENT_MANAGER}
  ${FRAGMENT_CLIENT}
`
