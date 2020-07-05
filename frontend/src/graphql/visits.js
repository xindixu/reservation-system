import { gql } from "apollo-boost"

export const GET_ALL_VISITS = gql`
  query {
    visits {
      id
      startsAt
      endsAt
      allDay
      slot {
        id
        name
      }
      client {
        id
        firstName
        lastName
        manager {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const CREATE_VISIT = gql`
  mutation CreateVisit(
    $startsAt: ISO8601Date!
    $endsAt: ISO8601Date!
    $allDay: Boolean!
    $slotId: ID!
    $clientId: ID!
  ) {
    createVisit(
      input: {
        startsAt: $startsAt
        endsAt: $endsAt
        allDay: $allDay
        slotId: $slotId
        clientId: $clientId
      }
    ) {
      visit {
        id
        startsAt
        endsAt
        allDay
        slot {
          id
          name
        }
        client {
          id
          firstName
          lastName
          manager {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`

export const UPDATE_VISIT = gql`
  mutation UpdateVisit(
    $id: ID!
    $startsAt: ISO8601Date
    $endsAt: ISO8601Date
    $allDay: allDay
    $slotId: ID
  ) {
    updateVisit(
      input: { id: $id, startsAt: $startsAt, endsAt: $endsAt, allDay: $allDay, slotId: $slotId }
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
          manager {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`

export const DELETE_VISIT = gql`
  mutation DeleteVisit($id: String!) {
    deleteVisit(id: $id) {
      id
      startsAt
      endsAt
      slot {
        name
      }
      client {
        firstName
        lastName
        manager {
          firstName
          lastName
        }
      }
    }
  }
`
