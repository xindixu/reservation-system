import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_ALL_VISITS, CREATE_VISIT, UPDATE_VISIT } from "graphql/visits"
import Calendar from "components/calendar"
import Modal from "components/modal"
import VisitForm from "components/forms/visit-form"
import FAButton from "components/floating-action-button"
import { getFullName } from "lib/utils"

const MODALS = {
  addVisit: "addVisit",
  editVisit: "editVisit",
}

const INITIAL_VISIT = {
  allDay: true,
}

const CalendarPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_VISITS)
  const [addVisit] = useMutation(CREATE_VISIT, {
    update: (cache, { data: { createVisit } }) => {
      const { visit } = createVisit
      const { visits } = cache.readQuery({ query: GET_ALL_VISITS })
      cache.writeQuery({
        query: GET_ALL_VISITS,
        data: {
          visits: [...visits, visit],
        },
      })
    },
  })

  const [editVisit] = useMutation(UPDATE_VISIT)

  const [visit, setVisit] = useState(INITIAL_VISIT)
  const [selectedVisit, setSelectedVisit] = useState({})
  const [modalToShow, setModalToShow] = useState("")
  if (loading) {
    return "loading..."
  }
  if (error) {
    return `Error ${error.message}`
  }

  const { visits } = data

  return (
    <>
      <Calendar
        visits={visits}
        deleteVisit={() => {}}
        editVisit={(id) => {
          setSelectedVisit(visits.find((v) => v.id === id))
          setModalToShow(MODALS.editVisit)
        }}
      />
      {modalToShow === MODALS.editVisit && (
        <Modal
          title={`Edit Visit for ${getFullName(selectedVisit.client)}`}
          onClose={() => setModalToShow("")}
          onSubmit={() => {
            editVisit({ variables: { id: selectedVisit.id, ...visit } })
            setVisit(INITIAL_VISIT)
            setSelectedVisit({})
          }}
          primaryButtonText="Update"
        >
          <VisitForm
            initialVisit={selectedVisit}
            visit={visit}
            setVisit={setVisit}
            disabled={{ client: true }}
          />
        </Modal>
      )}
      {modalToShow === MODALS.addVisit && (
        <Modal
          title="Create New Visit"
          onClose={() => setModalToShow("")}
          onSubmit={() => {
            addVisit({ variables: { ...visit } })
            setVisit(INITIAL_VISIT)
          }}
          primaryButtonText="Create"
        >
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
