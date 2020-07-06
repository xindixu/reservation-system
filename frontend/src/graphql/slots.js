import { gql } from "apollo-boost"

export const GET_ALL_SLOTS = gql`
  query {
    slots {
      id
      name
      description
      shareable
      team {
        id
        name
      }
      manager {
        id
        firstName
        lastName
      }
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

export const CREATE_SLOT = gql`
  mutation CreateSlot($name: String!, $description: String, $shareable: Boolean!, $managerId: ID!) {
    createSlot(
      input: {
        name: $name
        description: $description
        shareable: $shareable
        managerId: $managerId
      }
    ) {
      slot {
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
  }
`
