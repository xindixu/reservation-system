import { gql } from "apollo-server-express"

export default gql`
  type Client {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    cycle: Int!
    duration: Int!
    managers: [Manager!]
  }

  input ClientInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    cycle: Int!
    duration: Int!
  }

  input ClientInputWithID {
    id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    cycle: Int
    duration: Int
  }

  extend type Query {
    clients: [Client!]
    client(id: ID!): Client!
  }

  extend type Mutation {
    createClient(input: ClientInput): Client @auth
    updateClient(input: ClientInputWithID): Client @auth
    deleteClient(id: ID!): Boolean @auth
    addManagersToClient(id: ID!, managerIds: [ID!]!): Client @auth
    removeManagersFromClient(id: ID!, managerIds: [ID!]!): Client @auth
  }
`
