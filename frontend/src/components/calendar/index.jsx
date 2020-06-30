import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'

import { CalendarGlobalStyleOverride } from './styles'
import { VISIT } from '../../lib/commonTypes'


const Calendar = ({ initialVisits, deleteVisit, addVisit }) => {
  const [showWeekends, setShowWeekends] = useState(true)
  const [visits, setVisits] = useState(() => initialVisits.map(({
    id, startsAt, endsAt, allDay, client: { firstName, lastName },
  }) => ({
    id,
    title: `Visit: ${firstName} ${lastName}`,
    start: startsAt,
    end: endsAt,
    allDay,
    editable: true,
  })))


  const calendar = useRef(null)

  const goToPast = () => {
    const calendarApi = calendar.current.getApi()
    calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
  }

  const onDateClick = (arg) => {
    console.log(arg)
    // setVisits([
    //   ...visits,
    //   {
    //     title: 'New Visit',
    //     start: arg.date,
    //     allDay: arg.allDay,
    //   }]);
  }

  const onVisitClick = (arg) => {
    const {
      id, allDay, start, end,
    } = arg.event
    console.log(id, allDay, start, end)
    deleteVisit({ variables: { id } })
  }

  const onVisitMouseEnter = (arg) => {
    // console.log(arg);
  }


  const customButtons = {
    addVisitButton: {
      text: 'New Visit',
      click: () => addVisit(),
    },
    toggleShowWeekendsButton: {
      text: `${showWeekends ? 'Hide' : 'Show'} Weekends`,
      click: () => setShowWeekends(!showWeekends),
    },
  }

  return (
    <>
      <CalendarGlobalStyleOverride />
      <FullCalendar
        customButtons={customButtons}
        defaultView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'addVisitButton toggleShowWeekendsButton',
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable
        droppable
        ref={calendar}
        weekends={showWeekends}
        events={visits}
        eventClick={onVisitClick}
        eventMouseEnter={onVisitMouseEnter}
        dateClick={onDateClick}
      />
    </>
  )
}


Calendar.propTypes = {
  initialVisits: PropTypes.arrayOf(
    VISIT,
  ).isRequired,
}
export default Calendar
