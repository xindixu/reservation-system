import { gql } from "apollo-server-express"

export default gql`
  type User {
    id: ID!
    email: String
    role: String
    accessToken: String
    refreshToken: String
  }

  type SignUpInvalidInputError {
    email: String
    password: String
    role: String
  }

  type SignInInvalidInputError {
    email: String
    password: String
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

  union SignUpResult = SignUpInvalidInputError | User
  union SignInResult = SignInInvalidInputError | User

  extend type Query {
    users: [User!] @auth
    user(id: ID!): User! @auth
    me: User @auth
  }

  extend type Mutation {
    signUp(input: SignUpInput): SignUpResult @guest
    signIn(input: SignInInput): SignInResult @guest
    signOut: Boolean! @auth
    invalidateToken: Boolean! @auth
  }
`
