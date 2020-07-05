import { gql } from "apollo-boost"

export const GET_ALL_TEAMS = gql`
  query Teams {
    teams {
      id
      name
      email
      phone
      description
      managersCount
    }
  }
`

export const GET_TEAM_BY_ID = gql`
  query Team($id: ID!) {
    team(id: $id) {
      id
      name
      email
      phone
      description
      managersCount
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
  }
`

export const CREATE_TEAM = gql`
  mutation CreateTeam($name: String!, $email: String, $phone: String, $description: String) {
    createTeam(input: { name: $name, email: $email, phone: $phone, description: $description }) {
      team {
        id
        name
        email
        phone
        description
        managersCount
      }
    }
  }
`

export const UPDATE_TEAM = gql`
  mutation UpdateTeam(
    $id: ID!
    $name: String
    $email: String
    $phone: String
    $description: String
    $managerIds: [ID!]
  ) {
    updateTeam(
      input: {
        id: $id
        name: $name
        email: $email
        phone: $phone
        description: $description
        managerIds: $managerIds
      }
    ) {
      team {
        id
        name
        email
        phone
        description
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
    }
  }
`
