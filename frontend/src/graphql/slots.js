import { gql } from "apollo-boost"
import { SLOT, MANAGER, VISIT, TEAM, CLIENT } from "./fragments"

export const GET_ALL_SLOTS = gql`
  query {
    slots {
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

export const CREATE_SLOT = gql`
  mutation CreateSlot(
    $name: String!
    $description: String
    $shareable: Boolean! # $managerId: ID!
  ) {
    createSlot(
      input: {
        name: $name
        description: $description
        shareable: $shareable
        # managerId: $managerId
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
    $shareable: Boolean # $managerId: ID
  ) {
    updateSlot(
      input: {
        id: $id
        name: $name
        description: $description
        shareable: $shareable
        # managerId: $managerId
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
