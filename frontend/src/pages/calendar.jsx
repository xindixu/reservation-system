import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Calendar from '../components/calendar';
import { getAllVisits } from '../graphql/visits';


const CalendarPage = () => {
  const { loading, error, data } = useQuery(getAllVisits);
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
