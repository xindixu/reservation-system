import { gql } from "apollo-boost"

export const GET_ALL_CLIENTS = gql`
  query {
    clients {
      id
      firstName
      lastName
      email
      phone
      cycle
      duration
      manager {
        id
        firstName
        lastName
      }
    }
  }
`

export const CREATE_CLIENT = gql`
  mutation CreateClient(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $cycle: Int!
    $duration: Int!
    $managerId: ID!
  ) {
    createClient(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        cycle: $cycle
        duration: $duration
        managerId: $managerId
      }
    ) {
      client {
        id
        firstName
        lastName
        email
        phone
        cycle
        duration
        manager {
          id
          firstName
          lastName
        }
      }
    }
  }
`
