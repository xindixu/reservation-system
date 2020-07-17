import { gql } from "apollo-boost"

export const GET_ALL_VISITS = gql`
  query {
    visits {
      id
      startsAt
      endsAt
      slot {
        id
        name
      }
      client {
        id
        firstName
        lastName
      }
    }
  }
`

export const CREATE_VISIT = gql`
  mutation CreateVisit(
    $startsAt: ISO8601DateTime!
    $endsAt: ISO8601DateTime!
    $slotId: ID!
    $clientId: ID!
  ) {
    createVisit(
      input: { startsAt: $startsAt, endsAt: $endsAt, slotId: $slotId, clientId: $clientId }
    ) {
      visit {
        id
        startsAt
        endsAt
        slot {
          id
          name
        }
        client {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const UPDATE_VISIT = gql`
  mutation UpdateVisit(
    $id: ID!
    $startsAt: ISO8601DateTime
    $endsAt: ISO8601DateTime
    $slotId: ID
  ) {
    updateVisit(input: { id: $id, startsAt: $startsAt, endsAt: $endsAt, slotId: $slotId }) {
      visit {
        id
        startsAt
        endsAt
        slot {
          id
          name
        }
        client {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const DESTROY_VISIT = gql`
  mutation DestroyVisit($id: ID!) {
    destroyVisit(input: { id: $id }) {
      visit {
        id
      }
    }
  }
`
