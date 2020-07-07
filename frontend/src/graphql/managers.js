import { gql } from "apollo-boost"
import { FRAGMENT_MANAGER } from "./fragments"

export const GET_ALL_MANAGERS = gql`
  query Managers {
    managers {
      ...Extended
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
      ...Extended
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
        clientsCount
        team {
          id
        }
      }
    }
  }
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
      manager {
        id
        firstName
        lastName
        jobTitle
        email
        phone
        team {
          id
          name
        }
        clientsCount
      }
    }
  }
`
