import { gql } from "apollo-server-express"

const Manager = gql`
  type Manager {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    jobTitle: String!
    team: Team!
  }
`

const ManagerInput = gql`
  input ManagerInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    jobTitle: String!
    teamId: ID!
  }
`

export { Manager, ManagerInput }
