import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarGlobalStyleOverride } from './styles';
import { VISIT } from '../../lib/commonTypes';

const Calendar = ({ initialEvents }) => {
  const [showWeekends, setShowWeekends] = useState(true);
  const [events, setEvents] = useState(initialEvents);


  const calendar = useRef(null);

  const goToPast = () => {
    const calendarApi = calendar.current.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  };

  const onDateClick = (arg) => {
    setEvents([
      ...events,
      {
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay,
      }]);
  };

  return (
    <>
      <CalendarGlobalStyleOverride />

      <button onClick={() => setShowWeekends(!showWeekends)} type="button">toggle weekends</button>
      <button onClick={goToPast} type="button">go to a date in the past</button>

      <div className="demo-app-calendar">
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={calendar}
          weekends={showWeekends}
          events={events}
          dateClick={onDateClick}
        />
      </div>
    </>
  );
};


Calendar.propTypes = {
  initialEvents: PropTypes.arrayOf(
    VISIT,
  ).isRequired,
};
export default Calendar;
