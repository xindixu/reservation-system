import React, { useState } from "react"
import PropTypes from "prop-types"
import { isEmpty, pickBy } from "lodash"

import Toolbar from "./toolbar"
import Calendar from "components/calendar"
import Modal from "components/modal"
import VisitForm from "components/forms/visit-form"
import FAButton from "components/floating-action-button"
import { VISIT } from "lib/commonTypes"
import { getFullName } from "lib/utils"
import { toISOStringWithTZ } from "lib/datetime"

const MODALS = {
  addVisit: "addVisit",
  editVisit: "editVisit",
}

const Page = ({ addVisit, deleteVisit, editVisit, searchVisits, setSearchParams, visits }) => {
  const [selectedVisit, setSelectedVisit] = useState({})
  const [presetDate, setPresetDate] = useState({})
  const [modalToShow, setModalToShow] = useState("")

  const modalOnCloseAndReset = () => {
    setModalToShow("")
    setPresetDate({})
    setSelectedVisit({})
  }

  return (
    <>
      <Toolbar
        onFilterChange={(rawFilters) => {
          const filters = pickBy(rawFilters, (value) => value && value.length > 0)
          setSearchParams(filters)
          if (!isEmpty(filters)) {
            searchVisits()
          }
        }}
      />

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

Page.propTypes = {
  addVisit: PropTypes.func.isRequired,
  deleteVisit: PropTypes.func.isRequired,
  editVisit: PropTypes.func.isRequired,
  searchVisits: PropTypes.func.isRequired,
  setSearchParams: PropTypes.func.isRequired,
  visits: PropTypes.arrayOf(VISIT).isRequired,
}

export default Page
