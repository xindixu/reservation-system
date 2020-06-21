import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Calendar from '../components/calendar';

const VISITS = gql`
  query {
    visits{
      id
      startsAt
      endsAt
      slot {
        name
      }
      client{
        firstName
        lastName
        manager{
          firstName
          lastName
        }
      }
    }
  }
`;


const CalendarPage = () => {
  const { loading, error, data } = useQuery(VISITS);
  if (loading) {
    return 'loading...';
  }
  if (error) {
    return `Error ${error.message}`;
  }

  return (
    <Calendar initialEvents={data.visits} />
  );
};


export default CalendarPage;
