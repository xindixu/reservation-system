import { gql } from "@apollo/client"
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

export const GET_VISITS_IN_RANGE = gql`
  query VisitsInRange($from: DateTime!, $to: DateTime!) {
    visitsInRange(from: $from, to: $to) {
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
  mutation CreateVisit($start: DateTime!, $end: DateTime!, $slotId: ID!, $clientId: ID!) {
    createVisit(input: { start: $start, end: $end, slotId: $slotId, clientId: $clientId }) {
      ...ExtendedVisit
      client {
        ...BasicClient
      }
    }
  }
  ${VISIT.extended}
  ${CLIENT.basic}
`

export const UPDATE_VISIT = gql`
  mutation UpdateVisit($id: ID!, $start: DateTime, $end: DateTime, $slotId: ID, $clientId: ID) {
    updateVisit(
      input: { id: $id, start: $start, end: $end, slotId: $slotId, clientId: $clientId }
    ) {
      ...ExtendedVisit
    }
  }
  ${VISIT.extended}
`

export const DESTROY_VISIT = gql`
  mutation DestroyVisit($id: ID!) {
    destroyVisit(id: $id)
  }
`
