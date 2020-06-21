import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(Calendar);


const VISITS = gql`
  query {
    visits{
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

const CalendarPage = (props) => {
  const { loading, error, data } = useQuery(VISITS);
  if (loading) {
    return 'loading...';
  }
  if (error) {
    return `Error ${error.message}`;
  }

  const onEventDrop = () => {

  };


  const onEventResize = () => {

  };
  return (
    <div>
      <DnDCalendar
        defaultDate={new Date()}
        defaultView="month"
        events={data.visits}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        startAccessor="startsAt"
        endAccessor="endsAt"
        resizable
        style={{ height: '100vh' }}
      />

      {data.visits.map(({
        startsAt,
        endsAt, slot, client,
      }) => (
        <div>
          {startsAt}
          {endsAt}
          {slot.name}
          {client.firstNme}
          {' '}
          {client.lastName}
        </div>
      ))}
    </div>
  );
};


export default CalendarPage;
