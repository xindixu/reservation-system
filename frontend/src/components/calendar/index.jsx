import React, { useRef, useMemo } from "react"
import PropTypes from "prop-types"
import { useMeasure } from "react-use"
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

const Calendar = ({ visits, onClickVisit, onEditVisit, initialDate }) => {
  const events = useMemo(
    () =>
      visits.map(({ id, startsAt, endsAt, client: { firstName, lastName } }) => ({
        id,
        title: `Visit: ${firstName} ${lastName}`,
        start: startsAt,
        end: endsAt,
        editable: true,
      })),
    [visits]
  )

  const calendar = useRef(null)
  const [wrapperRef] = useMeasure()

  const onEventClick = (arg) => {
    onClickVisit(arg.event.id)
  }

  const onEventDrop = (arg) => {
    const { id, start, end } = arg.event
    onEditVisit(id, start, end)
  }

  return (
    <Wrapper ref={wrapperRef}>
      <CalendarGlobalStyleOverride />
      <FullCalendar
        height="auto"
        headerToolbar={{
          start: "prev next",
          center: "title",
          end: "today",
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable
        editable
        droppable
        ref={calendar}
        events={events}
        eventClick={onEventClick}
        eventDrop={onEventDrop}
        themeSystem="standard"
        eventTextColor="#000"
        eventBackgroundColor="#bae7ff"
        eventBorderColor="#bae7ff"
        eventTimeFormat={getTimeFormat()}
        initialDate={initialDate || new Date()}
      />
    </Wrapper>
  )
}

Calendar.defaultProps = {
  initialDate: "",
}

Calendar.propTypes = {
  visits: PropTypes.arrayOf(PropTypes.shape(VISIT)).isRequired,
  onClickVisit: PropTypes.func.isRequired,
  onEditVisit: PropTypes.func.isRequired,
  initialDate: PropTypes.string,
}

export default Calendar
