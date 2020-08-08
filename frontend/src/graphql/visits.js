import { gql } from "apollo-boost"
import { VISIT, CLIENT } from "./fragments"

export const GET_ALL_VISITS = gql`
  query Visits {
    visits {
      ...ExtendedVisit
      client {
        ...BasicClient
      }
    }
  }
  ${VISIT.extended}
  ${CLIENT.basic}
`

export const GET_VISITS = gql`
  query Visits($managerIds: [ID!], $clientIds: [ID!], $slotIds: [ID!]) {
    visits(managerIds: $managerIds, clientIds: $clientIds, slotIds: $slotIds) {
      ...ExtendedVisit
      client {
        ...BasicClient
      }
    }
  }
  ${VISIT.extended}
  ${CLIENT.basic}
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
        ...ExtendedVisit
        client {
          ...BasicClient
        }
      }
    }
  }
  ${VISIT.extended}
  ${CLIENT.basic}
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
        ...ExtendedVisit
      }
    }
  }
  ${VISIT.extended}
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
