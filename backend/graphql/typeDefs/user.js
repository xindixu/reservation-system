import { gql } from "apollo-server-express"

export default gql`
  type User {
    id: ID!
    email: String
    roleType: RoleType
    role: Role!
    accessToken: String
    refreshToken: String
  }

  type SignUpInvalidInputError {
    email: String
    password: String
    roleType: RoleType
  }

  type SignInInvalidInputError {
    email: String
    password: String
  }

  input SignUpInput {
    email: String!
    password: String!
    roleType: RoleType!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  union SignUpResult = SignUpInvalidInputError | User
  union SignInResult = SignInInvalidInputError | User
  union Role = Manager | Client

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
