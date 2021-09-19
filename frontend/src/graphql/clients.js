import { gql } from "@apollo/client"
import { CLIENT, MANAGER, VISIT } from "./fragments"

export const GET_PAGINATED_CLIENTS = gql`
  query Clients($size: Int!, $next: String, $filters: ClientFilters) {
    clients(size: $size, next: $next, filters: $filters) {
      clients {
        ...ExtendedClient
        managers {
          ...BasicManager
        }
      }
      hasNext
      next
    }
  }
  ${CLIENT.extended}
  ${MANAGER.basic}
`
export const GET_ALL_CLIENTS = gql`
  query AllClients {
    allClients {
      ...ExtendedClient
    }
  }
  ${CLIENT.extended}
`

export const GET_CLIENT_BY_ID = gql`
  query Client($id: ID!) {
    client(id: $id) {
      ...ExtendedClient
      managers {
        ...BasicManager
      }
      visits {
        ...ExtendedVisit
      }
    }
  }
  ${CLIENT.extended}
  ${MANAGER.basic}
  ${VISIT.extended}
`

export const SEARCH_CLIENTS = gql`
  query SearchClients($q: String!) {
    searchClients(q: $q) {
      ...BasicClient
    }
  }
  ${CLIENT.basic}
`

export const CREATE_CLIENT = gql`
  mutation CreateClient(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $cycle: Int!
    $duration: Int!
    $managerIds: [ID!]
    $userId: ID
  ) {
    createClient(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        cycle: $cycle
        duration: $duration
        managerIds: $managerIds
        userId: $userId
      }
    ) {
      ...ExtendedClient
      managers {
        ...BasicManager
      }
    }
  }
  ${CLIENT.extended}
  ${MANAGER.basic}
`

export const UPDATE_CLIENT = gql`
  mutation UpdateClient(
    $id: ID!
    $firstName: String!
    $lastName: String
    $email: String
    $phone: String
    $cycle: Int
    $duration: Int
    $managerIds: [ID!]
    $userId: ID
  ) {
    updateClient(
      input: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        cycle: $cycle
        duration: $duration
        managerIds: $managerIds
        userId: $userId
      }
    ) {
      ...ExtendedClient
      managers {
        ...BasicManager
      }
    }
  }
  ${CLIENT.extended}
  ${MANAGER.basic}
`

export const DESTROY_CLIENT = gql`
  mutation DestroyClient($id: ID!) {
    destroyClient(id: $id)
  }
`
