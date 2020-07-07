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
        description
        shareable
        manager {
          id
          firstName
          lastName
        }
        team {
          id
          name
        }
      }
    }
  }
`

export const UPDATE_SLOT = gql`
  mutation UpdateSlot(
    $id: ID!
    $name: String
    $description: String
    $shareable: Boolean
    $managerId: ID
  ) {
    updateSlot(
      input: {
        id: $id
        name: $name
        description: $description
        shareable: $shareable
        managerId: $managerId
      }
    ) {
      slot {
        id
        name
        description
        shareable
        manager {
          id
          firstName
          lastName
        }
        team {
          id
          name
        }
      }
    }
  }
`

export const DESTROY_SLOT = gql`
  mutation DestroySlot($id: ID!) {
    destroySlot(input: { id: $id }) {
      slot {
        id
      }
    }
  }
`
