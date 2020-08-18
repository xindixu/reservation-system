import { gql } from "apollo-server-express"

export default gql`
  type Team {
    id: ID!
    name: String!
    description: String!
    email: String!
    phone: String!
    managers: [Manager!]
    managersCount: Int!
    slots: [Slot!]
  }

  input TeamInput {
    name: String!
    description: String!
    email: String!
    phone: String!
    managerIds: [ID!]
    slotIds: [ID!]
  }

  input TeamInputWithId {
    id: ID!
    name: String
    description: String
    email: String
    phone: String
    managerIds: [ID!]
    slotIds: [ID!]
  }

  extend type Query {
    teams: [Team!]
    team(id: ID!): Team!
  }

  extend type Mutation {
    createTeam(input: TeamInput): Team @auth
    updateTeam(input: TeamInputWithId): Team @auth
    deleteTeam(id: ID!): Boolean @auth
  }
`
