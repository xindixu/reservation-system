import { gql } from "apollo-boost"

export const GET_ALL_MANAGERS = gql`
  query Managers {
    managers {
      id
      firstName
      lastName
      jobTitle
      email
      phone
      clientsCount
    }
  }
`

export const GET_MANAGER_BY_ID = gql`
  query Manager($id: ID!) {
    manager(id: $id) {
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
      clients {
        firstName
        lastName
        cycle
        duration
      }
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
        clientsCount
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
