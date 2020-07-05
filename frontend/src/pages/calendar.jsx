import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import moment from "moment"
import { GET_ALL_VISITS, CREATE_VISIT, UPDATE_VISIT, DESTROY_VISIT } from "graphql/visits"
import Calendar from "components/calendar"
import Modal from "components/modal"
import VisitForm from "components/forms/visit-form"
import FAButton from "components/floating-action-button"
import { getFullName } from "lib/utils"

const MODALS = {
  addVisit: "addVisit",
  editVisit: "editVisit",
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
  const [deleteVisit] = useMutation(DESTROY_VISIT, {
    update: (cache, { data: { destroyVisit } }) => {
      const { visit } = destroyVisit
      const { visits } = cache.readQuery({ query: GET_ALL_VISITS })
      cache.writeQuery({
        query: GET_ALL_VISITS,
        data: {
          visits: visits.filter((v) => v.id !== visit.id),
        },
      })
    },
  })

  const [visit, setVisit] = useState({})
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
        onClickVisit={(id) => {
          setSelectedVisit(visits.find((v) => v.id === id))
          setModalToShow(MODALS.editVisit)
        }}
        onEditVisit={(id, start, end) => {
          console.log(start)
          editVisit({
            variables: {
              id,
              startsAt: moment(start).toISOString(true),
              endsAt: moment(end).toISOString(true),
            },
          })
        }}
      />
      {modalToShow === MODALS.editVisit && (
        <Modal
          title={`Edit Visit for ${getFullName(selectedVisit.client)}`}
          onClose={() => setModalToShow("")}
          onSubmit={() => {
            editVisit({ variables: { id: selectedVisit.id, ...visit } })
            setVisit({})
            setSelectedVisit({})
          }}
          onDelete={() => {
            deleteVisit({ variables: { id: selectedVisit.id } })
          }}
          submitButtonText="Update"
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
            setVisit({})
          }}
          submitButtonText="Create"
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
