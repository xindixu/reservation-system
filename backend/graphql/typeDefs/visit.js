import { gql } from "apollo-server-express"

export default gql`
  type Visit {
    id: ID!
    start: DateTime!
    end: DateTime!
    client: Client!
    slot: Slot!
  }

  input VisitInput {
    start: DateTime!
    end: DateTime!
    clientId: ID!
    slotId: ID!
  }

  input VisitInputWithID {
    id: ID!
    start: DateTime
    end: DateTime
    clientId: ID
    slotId: ID
  }

  extend type Query {
    visits: [Visit!]
    visit(id: ID!): Visit!
  }

  extend type Mutation {
    createVisit(input: VisitInput): Visit @auth
    updateVisit(input: VisitInputWithID): Visit @auth
    destroyVisit(id: ID!): ID @auth
  }
`
