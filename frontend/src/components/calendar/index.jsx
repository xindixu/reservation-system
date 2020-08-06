import React, { useRef, useMemo } from "react"
import PropTypes from "prop-types"
import add from "date-fns/add"
import { useMeasure } from "react-use"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"

import { CalendarGlobalStyleOverride, Wrapper } from "./styles"
import { formatStart, formatEnd, toISOStringWithTZ } from "lib/datetime"
import { VISIT } from "lib/commonTypes"

const getTimeFormat = () => ({
  hour: "2-digit",
  minute: "2-digit",
  meridiem: false,
})

const Calendar = ({ visits, onClickVisit, onEditVisit, onSelectDateRange, initialDate }) => {
  const events = useMemo(
    () =>
      visits.map(({ id, startsAt, endsAt, client: { firstName, lastName } }) => ({
        id,
        title: `Visit: ${firstName} ${lastName}`,
        start: startsAt,
        end: toISOStringWithTZ(add(new Date(endsAt), { days: 1 })),
        allDay: true,
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
    onEditVisit(id, formatStart(start), formatEnd(end))
  }

  const onSelect = (arg) => {
    const { start, end, allDay } = arg
    onSelectDateRange(formatStart(start), formatEnd(end), allDay)
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
        eventBackgroundColor="#bae7ff"
        eventBorderColor="#bae7ff"
        eventTextColor="#000"
        themeSystem="standard"
        eventClick={onEventClick}
        eventDrop={onEventDrop}
        eventResize={onEventDrop}
        events={events}
        eventTimeFormat={getTimeFormat()}
        initialDate={initialDate || new Date()}
        select={onSelect}
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
  onSelectDateRange: PropTypes.func.isRequired,
  initialDate: PropTypes.string,
}

export default Calendar
