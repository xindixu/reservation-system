import React, { useRef, useState } from "react"
import PropTypes from "prop-types"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"

import { CalendarGlobalStyleOverride, Wrapper } from "./styles"
import { VISIT } from "lib/commonTypes"

const getTimeFormat = () => ({
  hour: "2-digit",
  minute: "2-digit",
  meridiem: false,
})

const Calendar = ({ visits, deleteVisit, editVisit }) => {
  const events = visits.map(
    ({ id, startsAt, endsAt, allDay, client: { firstName, lastName } }) => ({
      id,
      title: `Visit: ${firstName} ${lastName}`,
      start: startsAt,
      end: endsAt,
      allDay,
      editable: true,
    })
  )

  const calendar = useRef(null)

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
    const { id, allDay, start, end } = arg.event
    console.log(id, allDay, start, end)
    editVisit(id)
  }

  const onVisitMouseEnter = (arg) => {
    // console.log(arg);
  }

  return (
    <Wrapper>
      <CalendarGlobalStyleOverride />
      <FullCalendar
        height="auto"
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "",
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable
        droppable
        ref={calendar}
        events={events}
        eventClick={onVisitClick}
        eventMouseEnter={onVisitMouseEnter}
        dateClick={onDateClick}
        themeSystem="standard"
        eventTextColor="#000"
        eventBackgroundColor="#bae7ff"
        eventBorderColor="#bae7ff"
        eventTimeFormat={getTimeFormat()}
      />
    </Wrapper>
  )
}

Calendar.propTypes = {
  visits: PropTypes.arrayOf(PropTypes.shape(VISIT)).isRequired,
}
export default Calendar
