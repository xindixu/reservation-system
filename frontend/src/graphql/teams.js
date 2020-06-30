import { gql } from 'apollo-boost';

export const GET_ALL_TEAMS = gql`
  query {
    teams {
      id
      name
      description
      email
      phone
      managers {
        firstName
        lastName
        email
        phone
      }
    }
  }
`;
