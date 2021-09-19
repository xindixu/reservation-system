import { gql } from "@apollo/client"
import { SLOT, MANAGER, VISIT, TEAM, CLIENT } from "./fragments"

export const GET_PAGINATED_SLOTS = gql`
  query Slots($size: Int!, $next: String, $filters: SlotFilters) {
    slots(size: $size, next: $next, filters: $filters) {
      slots {
        ...ExtendedSlot
        team {
          ...BasicTeam
        }
        managers {
          ...BasicManager
        }
      }
      hasNext
      next
    }
  }
  ${SLOT.extended}
  ${MANAGER.basic}
  ${TEAM.basic}
`

export const GET_ALL_SLOTS = gql`
  query AllSlots {
    allSlots {
      ...ExtendedSlot
    }
  }
  ${SLOT.extended}
`

export const GET_SLOT_BY_ID = gql`
  query Slot($id: ID!) {
    slot(id: $id) {
      ...ExtendedSlot
      team {
        ...BasicTeam
      }
      managers {
        ...BasicManager
      }
      visits {
        ...ExtendedVisit
        client {
          ...BasicClient
        }
      }
    }
  }
  ${SLOT.extended}
  ${MANAGER.basic}
  ${TEAM.basic}
  ${VISIT.extended}
  ${CLIENT.basic}
`

export const SEARCH_SLOTS = gql`
  query SearchSlots($q: String!) {
    searchSlots(q: $q) {
      ...ExtendedSlot
    }
  }
  ${SLOT.extended}
`

export const CREATE_SLOT = gql`
  mutation CreateSlot(
    $name: String!
    $description: String
    $shareable: Boolean!
    $managerIds: [ID!]
  ) {
    createSlot(
      input: {
        name: $name
        description: $description
        shareable: $shareable
        managerIds: $managerIds
      }
    ) {
      ...ExtendedSlot
      team {
        ...BasicTeam
      }
      managers {
        ...BasicManager
      }
    }
  }
  ${SLOT.extended}
  ${MANAGER.basic}
  ${TEAM.basic}
`

export const UPDATE_SLOT = gql`
  mutation UpdateSlot(
    $id: ID!
    $name: String
    $description: String
    $shareable: Boolean
    $managerIds: [ID!]
  ) {
    updateSlot(
      input: {
        id: $id
        name: $name
        description: $description
        shareable: $shareable
        managerIds: $managerIds
      }
    ) {
      ...ExtendedSlot
      team {
        ...BasicTeam
      }
      managers {
        ...BasicManager
      }
    }
  }
  ${SLOT.extended}
  ${MANAGER.basic}
  ${TEAM.basic}
`

export const DESTROY_SLOT = gql`
  mutation DestroySlot($id: ID!) {
    destroySlot(id: $id)
  }
`
