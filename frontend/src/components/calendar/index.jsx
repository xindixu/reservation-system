import React, { useRef, useMemo } from "react"
import PropTypes from "prop-types"
import add from "date-fns/add"
import { useMeasure } from "react-use"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"

import { Calendar as BaseCalendar, Views, Navigate, dateFnsLocalizer } from "react-big-calendar"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import EventBank from "./event-bank"
import { CalendarGlobalStyleOverride, Wrapper } from "./styles"
import { VISIT } from "lib/commonTypes"
import { formatStart, formatEnd, toISOStringWithTZ } from "lib/datetime"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { enUS } from "date-fns/locale"

import Toolbar from "./toolbar"

const locales = {
  "en-US": enUS,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const DnDCalendar = withDragAndDrop(BaseCalendar)

const Calendar = ({ visits, onClickVisit, onEditVisit, onSelectDateRange, initialDate }) => {
  const events = useMemo(
    () =>
      visits.map(({ id, startsAt, endsAt, client: { firstName, lastName } }) => ({
        id,
        title: `Visit: ${firstName} ${lastName}`,
        start: new Date(startsAt),
        end: new Date(endsAt),
        allDay: true,
        editable: true,
      })),
    [visits]
  )

  const calendar = useRef(null)
  const [wrapperRef] = useMeasure()

  const onEventDrop = (data) => {
    const { event, start, end } = data
    const { id } = event
    onEditVisit(id, formatStart(start), formatEnd(end))
  }

  const onSelectEvent = (data) => {
    onClickVisit(data.id)
  }
  const onSelectSlot = (data) => {
    const { start, end } = data
    onSelectDateRange(formatStart(start), formatEnd(end), true)
  }

  return (
    <>
      <Wrapper ref={wrapperRef}>
        <CalendarGlobalStyleOverride />
        <DnDCalendar
          defaultDate={new Date()}
          defaultView={Views.MONTH}
          events={events}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventDrop}
          onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
          resizable
          selectable
          style={{ height: "100vh" }}
          components={{ toolbar: Toolbar }}
        />
      </Wrapper>
      <EventBank />
    </>
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
