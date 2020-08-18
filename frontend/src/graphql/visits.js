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

export const SEARCH_VISITS = gql`
  query SearchVisits($managerIds: [ID!], $clientIds: [ID!], $slotIds: [ID!]) {
    searchVisits(managerIds: $managerIds, clientIds: $clientIds, slotIds: $slotIds) {
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
    $start: ISO8601DateTime!
    $end: ISO8601DateTime!
    $slotId: ID!
    $clientId: ID!
  ) {
    createVisit(input: { start: $start, end: $end, slotId: $slotId, clientId: $clientId }) {
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
  mutation UpdateVisit($id: ID!, $start: ISO8601DateTime, $end: ISO8601DateTime, $slotId: ID) {
    updateVisit(input: { id: $id, start: $start, end: $end, slotId: $slotId }) {
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
