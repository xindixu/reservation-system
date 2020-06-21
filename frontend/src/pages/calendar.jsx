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


const parseVisit = visit => visit.map(({
  startsAt, endsAt, allDay, client: { firstName, lastName },
}) => ({
  title: `Visit: ${firstName} ${lastName}`, start: startsAt, end: endsAt, allDay,
}));

const CalendarPage = () => {
  const { loading, error, data } = useQuery(VISITS);
  if (loading) {
    return 'loading...';
  }
  if (error) {
    return `Error ${error.message}`;
  }

  return (
    <Calendar initialEvents={parseVisit(data.visits)} />
  );
};


export default CalendarPage;
