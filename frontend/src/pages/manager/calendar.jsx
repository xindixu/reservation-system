import React, { useState } from "react"
import { useQuery, useLazyQuery, useMutation } from "@apollo/client"
import PropTypes from "prop-types"
import Calendar from "components/calendar"

const Index = (props) => {
  const visits = []
  return (
    <Calendar
      visits={visits}
      initialDate={visits.length ? visits[visits.length - 1].start : ""}
      onClickVisit={(id) => {
        setSelectedVisit(visits.find((v) => v.id === id))
        setModalToShow(MODALS.editVisit)
      }}
      onEditVisit={(id, start, end) => {
        editVisit({
          variables: {
            id,
            start: toISOStringWithTZ(new Date(start)),
            end: toISOStringWithTZ(new Date(end)),
          },
        })
      }}
      onSelectDateRange={(start, end, allDay) => {
        setPresetDate({ start, end, allDay })
        setModalToShow(MODALS.addVisit)
      }}
    />
  )
}

Index.propTypes = {}

export default Index
