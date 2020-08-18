import { gql } from "apollo-boost"
import { MANAGER, CLIENT } from "./fragments"

export const GET_ALL_MANAGERS = gql`
  query Managers {
    managers {
      ...ExtendedManager
      team {
        id
      }
    }
  }
  ${MANAGER.extended}
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
        ...ExtendedClient
      }
    }
  }
  ${MANAGER.extended}
  ${CLIENT.extended}
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
      ...ExtendedManager
      team {
        id
      }
    }
  }
  ${MANAGER.extended}
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
      }
    ) {
      ...ExtendedManager
      team {
        id
        name
      }
    }
  }
  ${MANAGER.extended}
`

export const ADD_CLIENTS_TO_MANAGER = gql`
  mutation AddClientsToManager($id: ID!, $clientIds: [ID!]!) {
    addClientsToManager(id: $id, clientIds: $clientIds) {
      ...ExtendedManager
      clients {
        ...ExtendedClient
        managers {
          id
        }
      }
    }
  }
  ${MANAGER.extended}
  ${CLIENT.extended}
`

export const REMOVE_CLIENTS_FROM_MANAGER = gql`
  mutation RemoveClientsFromManager($id: ID!, $clientIds: [ID!]!) {
    removeClientsFromManager(id: $id, clientIds: $clientIds) {
      ...ExtendedManager
      clients {
        ...ExtendedClient
        managers {
          id
        }
      }
    }
  }
  ${MANAGER.extended}
  ${CLIENT.extended}
`
