import { gql } from "apollo-server-express"

export default gql`
  type User {
    _id: ID!
    email: String!
    accessToken: String
    refreshToken: String
  }

  input UserInput {
    email: String!
    password: String!
  }

  extend type Query {
    users: [User!]
    user(id: ID!): User!
  }

  extend type Mutation {
    signUp(userInput: UserInput): User
    signIn(userInput: UserInput): User
  }
`
