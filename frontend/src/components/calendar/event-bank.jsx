import React, { useRef } from "react"
import PropTypes from "prop-types"
import { Draggable } from "@fullcalendar/interaction"

const EventBank = (props) => {
  const eventEl = useRef(null)

  return <div ref={eventEl}>Event A</div>
}

EventBank.propTypes = {}

export default EventBank
