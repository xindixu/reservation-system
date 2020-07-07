import { gql } from "apollo-boost"
import { FRAGMENT_CLIENT } from "./fragments"

export const GET_ALL_CLIENTS = gql`
  query {
    clients {
      ...ExtendedClient
      managers {
        id
        firstName
        lastName
      }
    }
  }
  ${FRAGMENT_CLIENT}
`

export const CREATE_CLIENT = gql`
  mutation CreateClient(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $cycle: Int!
    $duration: Int!
    $managerIds: [ID!]
  ) {
    createClient(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        cycle: $cycle
        duration: $duration
        managerIds: $managerIds
      }
    ) {
      client {
        ...ExtendedClient
        managers {
          id
          firstName
          lastName
        }
      }
    }
  }
  ${FRAGMENT_CLIENT}
`

export const UPDATE_CLIENT = gql`
  mutation UpdateClient(
    $id: ID!
    $firstName: String!
    $lastName: String
    $email: String
    $phone: String
    $cycle: Int
    $duration: Int
    $managerIds: [ID!]
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
        managerIds: $managerIds
      }
    ) {
      client {
        ...ExtendedClient
        managers {
          id
          firstName
          lastName
        }
      }
    }
  }
  ${FRAGMENT_CLIENT}
`

export const DESTROY_CLIENT = gql`
  mutation DestroyClient($id: ID!) {
    destroyClient(input: { id: $id }) {
      client {
        id
      }
    }
  }
`
