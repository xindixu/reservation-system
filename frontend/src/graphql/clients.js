import { gql } from "apollo-boost"
import { CLIENT, MANAGER, VISIT } from "./fragments"

export const GET_ALL_CLIENTS = gql`
  query {
    clients {
      ...ExtendedClient
      managers {
        ...BasicManager
      }
    }
  }
  ${CLIENT.extended}
  ${MANAGER.basic}
`

export const GET_CLIENT_BY_ID = gql`
  query Client($id: ID!) {
    client(id: $id) {
      ...ExtendedClient
      managers {
        ...BasicManager
      }
      visits {
        ...ExtendedVisit
      }
    }
  }
  ${CLIENT.extended}
  ${MANAGER.basic}
  ${VISIT.extended}
`

export const CREATE_CLIENT = gql`
  mutation CreateClient(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $cycle: Int!
    $duration: Int! # $managerIds: [ID!]
  ) {
    createClient(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        cycle: $cycle
        duration: $duration
        # managerIds: $managerIds
      }
    ) {
      ...ExtendedClient
      managers {
        ...BasicManager
      }
    }
  }
  ${CLIENT.extended}
  ${MANAGER.basic}
`

export const UPDATE_CLIENT = gql`
  mutation UpdateClient(
    $id: ID!
    $firstName: String!
    $lastName: String
    $email: String
    $phone: String
    $cycle: Int
    $duration: Int # $managerIds: [ID!]
  ) {
    updateClient(
      input: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        cycle: $cycle
        duration: $duration
        # managerIds: $managerIds
      }
    ) {
      ...ExtendedClient
      managers {
        ...BasicManager
      }
    }
  }
  ${CLIENT.extended}
  ${MANAGER.basic}
`

export const DESTROY_CLIENT = gql`
  mutation DestroyClient($id: ID!) {
    destroyClient(id: $id)
  }
`
