import { gql } from "apollo-server-express"

export default gql`
  type User {
    id: ID!
    email: String!
    role: String!
    accessToken: String
    refreshToken: String
  }

  input SignUpInput {
    email: String!
    password: String!
    role: Role!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  extend type Query {
    users: [User!] @auth
    user(id: ID!): User! @auth
    me: User @auth
  }

  extend type Mutation {
    signUp(input: SignUpInput): User @guest
    signIn(input: SignInInput): User @guest
    signOut: Boolean! @auth
    invalidateToken: Boolean! @auth
  }
`
