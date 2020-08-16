import { gql } from "apollo-server-express"

export default gql`
  type Slot {
    id: ID!
    name: String!
    description: String!
    shareable: Boolean!
    team: Team!
  }

  input SlotInput {
    name: String!
    description: String!
    shareable: Boolean!
    teamId: ID!
  }

  input SlotInputWithID {
    id: ID!
    name: String!
    description: String!
    shareable: Boolean!
    teamId: ID!
  }

  extend type Query {
    slots: [Slot!]
    slot(id: ID!): Slot!
  }

  extend type Mutation {
    createSlot(input: SlotInput): Slot @auth
    updateSlot(input: SlotInputWithID): Slot @auth
    deleteSlot(id: ID!): Boolean @auth
  }
`
