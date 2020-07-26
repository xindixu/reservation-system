import { gql } from "apollo-boost"

export const CLIENT = {
  extended: gql`
    fragment ExtendedClient on Client {
      id
      firstName
      lastName
      email
      phone
      cycle
      duration
    }
  `,
  basic: gql`
    fragment BasicClient on Client {
      id
      firstName
      lastName
    }
  `,
}

export const MANAGER = {
  extended: gql`
    fragment ExtendedManager on Manager {
      id
      firstName
      lastName
      jobTitle
      email
      phone
      clientsCount
    }
  `,
  basic: gql`
    fragment BasicManager on Manager {
      id
      firstName
      lastName
    }
  `,
}

export const TEAM = {
  extended: gql`
    fragment ExtendedTeam on Team {
      id
      name
      email
      phone
      description
      managersCount
    }
  `,
}

export const VISIT = {
  extended: gql`
    fragment ExtendedVisit on Visit {
      id
      startsAt
      endsAt
      slot {
        id
        name
      }
    }
  `,
}
