import { gql } from "@apollo/client"
import { MANAGER, CLIENT } from "./fragments"

export const GET_ALL_MANAGERS = gql`
  query Managers($size: Int!, $next: String) {
    managers(size: $size, next: $next) {
      managers {
        ...ExtendedManager
        team {
          id
        }
      }
      hasNext
      next
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
        managers {
          ...BasicManager
        }
      }
    }
  }
  ${MANAGER.extended}
  ${MANAGER.basic}
  ${CLIENT.extended}
`

export const SEARCH_MANAGERS = gql`
  query SearchManagers($q: String!) {
    searchManagers(q: $q) {
      ...BasicManager
    }
  }
  ${MANAGER.basic}
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
    $userId: ID
  ) {
    createManager(
      input: {
        firstName: $firstName
        lastName: $lastName
        jobTitle: $jobTitle
        email: $email
        phone: $phone
        teamId: $teamId
        userId: $userId
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
    $userId: ID
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
        userId: $userId
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
