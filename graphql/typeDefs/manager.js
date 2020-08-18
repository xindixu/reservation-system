import { gql } from "apollo-server-express"

export default gql`
  type Manager {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    jobTitle: String!
    team: Team!
    slots: [Slot!]
    clients: [Client!]
    clientsCount: Int!
  }

  input ManagerInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    jobTitle: String!
    teamId: ID!
  }

  input ManagerInputWithId {
    id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    jobTitle: String
    teamId: ID
  }

  extend type Query {
    managers: [Manager!]
    manager(id: ID!): Manager!
  }

  extend type Mutation {
    createManager(input: ManagerInput): Manager @auth
    updateManager(input: ManagerInputWithId): Manager @auth
    deleteManager(id: ID!): Boolean @auth
    addSlotsToManager(id: ID!, slotIds: [ID]): Manager @auth
    removeSlotsFromManager(id: ID!, slotIds: [ID]): Manager @auth
    addClientsToManager(id: ID!, clientIds: [ID]): Manager @auth
    removeClientsFromManager(id: ID!, clientIds: [ID]): Manager @auth
  }
`
