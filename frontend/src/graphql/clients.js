import { gql } from 'apollo-boost';

export const getAllClients = gql`
  query {
    clients {
      id
      firstName
      lastName
    }
  }
`;
