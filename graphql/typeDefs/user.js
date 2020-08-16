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
    users: [User!] @auth
    user(id: ID!): User! @auth
    me: User @auth
  }

  extend type Mutation {
    signUp(userInput: UserInput): User @guest
    signIn(userInput: UserInput): User @guest
    signOut: Boolean! @auth
    invalidateToken: Boolean! @auth
  }
`
