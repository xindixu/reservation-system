import { gql } from 'apollo-boost';

export const TEAMS = gql`
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
