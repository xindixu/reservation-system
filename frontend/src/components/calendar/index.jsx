import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"

import { Calendar as BaseCalendar, Views, dateFnsLocalizer } from "react-big-calendar"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import { enUS } from "date-fns/locale"

import Toolbar from "./toolbar"
import EventBank from "./event-bank"
import { CalendarGlobalStyleOverride, Wrapper } from "./styles"
import { VISIT } from "lib/common-types"
import { formatStart, formatEnd } from "lib/datetime"

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

const Calendar = ({
  visits,
  onClickVisit,
  onEditVisit,
  onSelectDateRange,
  onDropVisit,
  initialDate,
}) => {
  const [draggedEvent, setDraggedEvent] = useState(null)

  const events = useMemo(
    () =>
      visits.map(({ id, start, end, client: { firstName, lastName }, slot: { name } }) => ({
        id,
        title: `Visit: ${firstName} ${lastName} at ${name}`,
        start: new Date(start),
        end: new Date(end),
        allDay: true,
        editable: true,
      })),
    [visits]
  )

  const onEventDrop = (data) => {
    const { event, start, end } = data
    const { id } = event
    onEditVisit(id, formatStart(start), formatEnd(end))
  }

  const onDropFromOutside = ({ start, end, allDay }) => {
    const event = {
      title: draggedEvent.title,
      start,
      end,
      isAllDay: allDay,
    }
    onDropVisit(draggedEvent, start, end, allDay)
    setDraggedEvent(null)
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
      <Wrapper>
        <CalendarGlobalStyleOverride />
        <DnDCalendar
          popup
          defaultDate={new Date()}
          defaultView={Views.MONTH}
          events={events}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onDropFromOutside={onDropFromOutside}
          dragFromOutsideItem={() => draggedEvent}
          onEventResize={onEventDrop}
          onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
          resizable
          selectable
          style={{ height: "100vh" }}
          components={{ toolbar: Toolbar }}
        />
      </Wrapper>
      <EventBank setDraggedEvent={setDraggedEvent} />
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
