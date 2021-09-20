import React from "react"
import PropTypes from "prop-types"

const EventBank = ({ setDraggedEvent }) => (
  <span
    draggable="true"
    key="a"
    onDragStart={() => setDraggedEvent({ title: "event-a", duration: 5 })}
  >
    Event A
  </span>
)

EventBank.propTypes = {
  setDraggedEvent: PropTypes.func.isRequired,
}

export default EventBank
