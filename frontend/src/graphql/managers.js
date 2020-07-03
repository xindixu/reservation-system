import { gql } from "apollo-boost"

export const GET_ALL_MANAGERS = gql`
  query {
    managers {
      id
      firstName
      lastName
      jobTitle
      email
      phone
      avatar {
        md
      }
      clientsCount
    }
  }
`

export const CREATE_MANAGER = gql`
  mutation CreateManager(
    $firstName: String!
    $lastName: String!
    $jobTitle: String!
    $email: String!
    $phone: String!
    $teamId: ID!
  ) {
    createManager(
      input: {
        firstName: $firstName
        lastName: $lastName
        jobTitle: $jobTitle
        email: $email
        phone: $phone
        teamId: $teamId
      }
    ) {
      manager {
        id
        firstName
        lastName
        jobTitle
        email
        phone
        avatar {
          md
        }
        clientsCount
      }
    }
  }
`
