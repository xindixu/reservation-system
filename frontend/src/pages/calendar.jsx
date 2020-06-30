import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Calendar from '../components/calendar';
import { GET_ALL_VISITS, DELETE_VISIT } from '../graphql/visits';


const CalendarPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_VISITS);
  const [deleteVisit] = useMutation(DELETE_VISIT);
  if (loading) {
    return 'loading...';
  }
  if (error) {
    return `Error ${error.message}`;
  }

  return (
    <Calendar initialEvents={data.visits} deleteVisit={deleteVisit} />
  );
};


export default CalendarPage;
