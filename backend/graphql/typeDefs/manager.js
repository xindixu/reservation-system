import { gql } from "apollo-server-express"

export default gql`
  type ManagerConnection {
    # previous: String!
    # hasPrevious: Boolean!
    next: String!
    hasNext: Boolean!
    managers: [Manager]!
  }

  type Manager {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    jobTitle: String!
    team: Team!
    user: User
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
    userId: ID
    clientIds: [ID!]
  }

  input ManagerInputWithId {
    id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    jobTitle: String
    teamId: ID
    userId: ID
    clientIds: [ID!]
  }

  extend type Query {
    managers(next: String, size: Int): ManagerConnection!
    manager(id: ID!): Manager!
    searchManagers(q: String): [Manager]!
  }

  extend type Mutation {
    createManager(input: ManagerInput): Manager @auth
    updateManager(input: ManagerInputWithId): Manager @auth
    destroyManager(id: ID!): ID @auth
    addSlotsToManager(id: ID!, slotIds: [ID]): Manager @auth
    removeSlotsFromManager(id: ID!, slotIds: [ID]): Manager @auth
    addClientsToManager(id: ID!, clientIds: [ID]): Manager @auth
    removeClientsFromManager(id: ID!, clientIds: [ID]): Manager @auth
  }
`
