import { gql } from "apollo-boost"

export const FRAGMENT_CLIENT = gql`
  fragment ExtendedClient on Client {
    id
    firstName
    lastName
    email
    phone
    cycle
    duration
  }
`

export const FRAGMENT_MANAGER = gql`
  fragment ExtendedManager on Manager {
    id
    firstName
    lastName
    jobTitle
    email
    phone
    clientsCount
  }
`

export const FRAGMENT_TEAM = gql`
  fragment ExtendedTeam on Team {
    id
    name
    email
    phone
    description
    managersCount
  }
`
