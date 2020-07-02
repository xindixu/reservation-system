import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_ALL_VISITS, DELETE_VISIT } from "graphql/visits"
import Calendar from "components/calendar"
import Modal from "components/modal"
import VisitForm from "components/visit-form"
import FAButton from "components/floating-action-button"

const MODALS = {
  addVisit: "addVisit",
}

const CalendarPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_VISITS)
  const [deleteVisit] = useMutation(DELETE_VISIT)

  const [visit, setVisit] = useState({ allDay: true })
  const [modalToShow, setModalToShow] = useState("")
  if (loading) {
    return "loading..."
  }
  if (error) {
    return `Error ${error.message}`
  }

  return (
    <>
      <Calendar initialVisits={data.visits} deleteVisit={() => {}} />
      {modalToShow === MODALS.addVisit && (
        <Modal title="Create New Visit" onClose={() => setModalToShow("")} onSubmit={() => {}}>
          <VisitForm visit={visit} setVisit={setVisit} />
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addVisit)}
        ariaLabel="New Visit"
        rotate={modalToShow}
      />
    </>
  )
}

export default CalendarPage
