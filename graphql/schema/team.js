import { gql } from "apollo-server-express"

const Team = gql`
  type Team {
    _id: ID!
    name: String!
    description: String!
    email: String!
    phone: String!
  }
`

const TeamInput = gql`
  input TeamInput {
    name: String!
    description: String!
    email: String!
    phone: String!
  }
`

export { Team, TeamInput }
