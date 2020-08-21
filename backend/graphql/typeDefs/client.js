import { gql } from "apollo-server-express"

export default gql`
  type ClientConnection {
    total: Int!
    prev: Int
    next: Int
    size: Int!
    clients: [Client!]!
  }

  type Client {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    cycle: Int!
    duration: Int!
    managers: [Manager!]
    visits: [Visit!]
  }

  input ClientInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    cycle: Int!
    duration: Int!
    managerIds: [ID!]
  }

  input ClientInputWithID {
    id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    cycle: Int
    duration: Int
    managerIds: [ID!]
  }

  extend type Query {
    clients(size: Int!, page: Int!): ClientConnection!
    client(id: ID!): Client!
  }

  extend type Mutation {
    createClient(input: ClientInput): Client @auth
    updateClient(input: ClientInputWithID): Client @auth
    destroyClient(id: ID!): ID @auth
    # addManagersToClient(id: ID!, managerIds: [ID!]!): Client @auth
    # removeManagersFromClient(id: ID!, managerIds: [ID!]!): Client @auth
  }
`
