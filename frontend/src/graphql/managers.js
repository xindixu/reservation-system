import { gql } from "apollo-boost"

export const GET_ALL_CLIENTS = gql`
  query {
    managers {
      firstName
      lastName
      email
      phone
      team
      clients
    }
  }
`
