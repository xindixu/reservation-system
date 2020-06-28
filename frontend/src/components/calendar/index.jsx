import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { CalendarGlobalStyleOverride } from './styles';
import { VISIT } from '../../lib/commonTypes';
import Modal from '../modal';
import Button from '../button';

const Calendar = ({ initialEvents }) => {
  const [showWeekends, setShowWeekends] = useState(true);
  const [events, setEvents] = useState(() => initialEvents.map(({
    id, startsAt, endsAt, allDay, client: { firstName, lastName },
  }) => ({
    id,
    title: `Visit: ${firstName} ${lastName}`,
    start: startsAt,
    end: endsAt,
    allDay,
    editable: true,
  })));

  const [showModal, setShowModal] = useState(false);


  const calendar = useRef(null);

  const goToPast = () => {
    const calendarApi = calendar.current.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  };

  const onDateClick = (arg) => {
    console.log(arg);
    // setEvents([
    //   ...events,
    //   {
    //     title: 'New Event',
    //     start: arg.date,
    //     allDay: arg.allDay,
    //   }]);
  };

  const onEventClick = (arg) => {
    const {
      id, allDay, start, end,
    } = arg.event;
    console.log(id, allDay, start, end);
  };

  const onEventMouseEnter = (arg) => {
    console.log(arg);
  };

  const addEvent = () => {
    setShowModal(true);
    // alert('add event');
  };

  const customButtons = {
    addEventButton: {
      text: 'New Event',
      click: addEvent,
    },
    toggleShowWeekendsButton: {
      text: `${showWeekends ? 'Hide' : 'Show'} Weekends`,
      click: () => setShowWeekends(!showWeekends),
    },
  };

  return (
    <>
      <CalendarGlobalStyleOverride />
      <FullCalendar
        customButtons={customButtons}
        defaultView="dayGridMonth"
        header={{
          left: 'prev,next today',
          center: 'title',
          right: 'addEventButton toggleShowWeekendsButton',
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        droppable
        ref={calendar}
        weekends={showWeekends}
        events={events}
        eventClick={onEventClick}
        eventMouseEnter={onEventMouseEnter}
        dateClick={onDateClick}
      />

      <Modal
        title="New Event"
        show={showModal}
        footer={(
          <>
            <Button
              filled={false}
              rounded
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => setShowModal(false)}
              rounded
            >
              Save
            </Button>
          </>
      )}
        onClose={() => setShowModal(false)}
      >

        shshsh
      </Modal>
    </>
  );
};


Calendar.propTypes = {
  initialEvents: PropTypes.arrayOf(
    VISIT,
  ).isRequired,
};
export default Calendar;
