import { gql } from "apollo-server-express"

export default gql`
  type Client {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    cycles: Number!
    duration: Number!
    managers: [Managers]
  }

  input ClientInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    cycles: Number!
    duration: Number!
    managers: [Managers]
  }

  extend type Query {
    clients: [Client!]
    client(id: ID!): Client!
  }

  extend type Mutation {
    createClient(input: ClientInput): Client @auth
  }
`
