import React from "react"
import PropTypes from "prop-types"

const EventBank = ({ setDraggedEvent }) => {
  return (
    <span
      draggable="true"
      key="a"
      onDragStart={() => setDraggedEvent({ title: "event-a", duration: 5 })}
    >
      Event A
    </span>
  )
}

EventBank.propTypes = {}

export default EventBank
