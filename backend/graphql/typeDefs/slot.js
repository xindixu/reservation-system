import { gql } from "apollo-server-express"

export default gql`
  type SlotConnection {
    # previous: String!
    # hasPrevious: Boolean!
    next: String!
    hasNext: Boolean!
    slots: [Slot]!
  }

  type Slot {
    id: ID!
    name: String!
    description: String!
    shareable: Boolean!
    team: Team!
    managers: [Manager!]
    visits: [Visit!]
  }

  input SlotInput {
    name: String!
    description: String!
    shareable: Boolean!
    teamId: ID!
    managerIds: [ID!]
  }

  input SlotInputWithID {
    id: ID!
    name: String
    description: String
    shareable: Boolean
    teamId: ID
    managerIds: [ID!]
  }

  input SlotFilters {
    managerIds: [ID!]
    teamId: ID
    shareable: Boolean
  }

  extend type Query {
    allSlots: [Slot]!
    searchSlots(q: String): [Slot]!
    slot(id: ID!): Slot!
    slots(next: String, size: Int, filters: SlotFilters): SlotConnection!
  }

  extend type Mutation {
    createSlot(input: SlotInput): Slot @auth
    updateSlot(input: SlotInputWithID): Slot @auth
    destroySlot(id: ID!): ID @auth
    addManagersToSlot(id: ID!, managerIds: [ID!]!): Slot @auth
    removeManagersFromSlot(id: ID!, managerIds: [ID!]!): Slot @auth
  }
`
