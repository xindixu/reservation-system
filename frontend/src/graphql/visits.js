import { gql } from 'apollo-boost';

export const getAllVisits = gql`
  query {
    visits {
      id
      startsAt
      endsAt
      slot {
        name
      }
      client {
        firstName
        lastName
        manager {
          firstName
          lastName
        }
      }
    }
  }
`;
