import { gql } from "apollo-boost"

export const GET_ALL_TEAMS = gql`
  query {
    teams {
      id
      name
      description
      email
      phone
      managers {
        firstName
        lastName
        email
        phone
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
      }
    }
  }
`
