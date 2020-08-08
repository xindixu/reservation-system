import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { GET_ALL_VISITS, CREATE_VISIT, UPDATE_VISIT, DESTROY_VISIT } from "graphql/visits"
import Calendar from "components/calendar"
import Modal from "components/modal"
import VisitForm from "components/forms/visit-form"
import FAButton from "components/floating-action-button"
import { getFullName } from "lib/utils"
import { toISOStringWithTZ } from "lib/datetime"

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

  const [selectedVisit, setSelectedVisit] = useState({})
  const [presetDate, setPresetDate] = useState({})
  const [modalToShow, setModalToShow] = useState("")
  if (loading) {
    return "loading..."
  }
  if (error) {
    return `Error ${error.message}`
  }

  const { visits } = data

  const modalOnCloseAndReset = () => {
    setModalToShow("")
    setPresetDate({})
    setSelectedVisit({})
  }

  return (
    <>
      <Calendar
        visits={visits}
        onClickVisit={(id) => {
          setSelectedVisit(visits.find((v) => v.id === id))
          setModalToShow(MODALS.editVisit)
        }}
        onEditVisit={(id, start, end) => {
          editVisit({
            variables: {
              id,
              startsAt: toISOStringWithTZ(new Date(start)),
              endsAt: toISOStringWithTZ(new Date(end)),
            },
          })
        }}
        onSelectDateRange={(startsAt, endsAt, allDay) => {
          setPresetDate({ startsAt, endsAt, allDay })
          setModalToShow(MODALS.addVisit)
        }}
      />
      {modalToShow === MODALS.editVisit && (
        <Modal
          title={`Edit Visit for ${getFullName(selectedVisit.client)}`}
          onClose={modalOnCloseAndReset}
          onDelete={() => {
            deleteVisit({ variables: { id: selectedVisit.id } })
          }}
          submitButtonText="Update"
        >
          {({ form }) => (
            <VisitForm
              initialVisit={selectedVisit}
              form={form}
              disabled={{ clientId: true }}
              onSubmit={(values) => {
                editVisit({ variables: { id: selectedVisit.id, ...values } })
                setSelectedVisit({})
              }}
            />
          )}
        </Modal>
      )}
      {modalToShow === MODALS.addVisit && (
        <Modal title="Create New Visit" onClose={modalOnCloseAndReset} submitButtonText="Create">
          {({ form }) => (
            <VisitForm
              form={form}
              onSubmit={(values) => addVisit({ variables: values })}
              initialVisit={{ ...presetDate }}
            />
          )}
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addVisit)}
        ariaLabel="New Visit"
        rotate={!!modalToShow}
      />
    </>
  )
}

export default CalendarPage
