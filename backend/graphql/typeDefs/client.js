import { gql } from "apollo-server-express"

export default gql`
  type ClientConnection {
    # previous: String!
    # hasPrevious: Boolean!
    next: String!
    hasNext: Boolean!
    clients: [Client]!
  }

  type Client {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    cycle: Int!
    duration: Int!
    user: User
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
    userId: ID
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
    userId: ID
    managerIds: [ID!]
  }

  input ClientFilters {
    managerIds: [ID!]
  }

  extend type Query {
    clients(next: String, size: Int, filters: ClientFilters): ClientConnection!
    client(id: ID!): Client!
    searchClients(q: String): [Client]!
  }

  extend type Mutation {
    createClient(input: ClientInput): Client @auth
    updateClient(input: ClientInputWithID): Client @auth
    destroyClient(id: ID!): ID @auth
  }
`
