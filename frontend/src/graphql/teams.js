import { gql } from 'apollo-boost';

export const getAllTeams = gql`
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
