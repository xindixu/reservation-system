import { gql } from "apollo-boost"

export const GET_ALL_SLOTS = gql`
  query {
    slots {
      id
      name
      manager {
        firstName
        lastName
        team {
          name
        }
      }
      description
      visits {
        startsAt
        endsAt
        client {
          firstName
        }
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
