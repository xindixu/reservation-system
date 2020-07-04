import { gql } from "apollo-boost"

export const GET_ALL_CLIENTS = gql`
  query {
    clients {
      id
      firstName
      lastName
      cycle
      duration
    }
  }
`
