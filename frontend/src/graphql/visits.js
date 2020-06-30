import { gql } from 'apollo-boost';

export const GET_ALL_VISITS = gql`
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


export const DELETE_VISIT = gql`
  mutation DeleteVisit($id: String!) {
    deleteVisit(id: $id){
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
