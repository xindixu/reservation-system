import React, { useState, Suspense } from "react"
import PropTypes from "prop-types"
import { isEmpty, pickBy } from "lodash"

import Toolbar from "./toolbar"
import { VISIT } from "lib/common-types"
import Calendar from "components/calendar"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import { getFullName } from "lib/utils"
import { toISOStringWithTZ } from "lib/datetime"

const VisitForm = React.lazy(() => import("components/forms/visit-form"))

const MODALS = {
  addVisit: "addVisit",
  editVisit: "editVisit",
}

const Page = ({
  addVisit,
  deleteVisit,
  editVisit,
  searchVisits,
  setSearchParams,
  searchParams,
  visits,
}) => {
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
            <Suspense fallback={<div />}>
              <VisitForm
                initialVisit={selectedVisit}
                form={form}
                disabled={{ clientId: true }}
                filtered={searchParams}
                onSubmit={(values) => {
                  editVisit({ variables: { id: selectedVisit.id, ...values } })
                  setSelectedVisit({})
                }}
              />
            </Suspense>
          )}
        </Modal>
      )}
      {modalToShow === MODALS.addVisit && (
        <Modal title="Create New Visit" onClose={modalOnCloseAndReset} submitButtonText="Create">
          {({ form }) => (
            <Suspense fallback={<div />}>
              <VisitForm
                form={form}
                filtered={searchParams}
                onSubmit={(values) => addVisit({ variables: values })}
                initialVisit={{ ...presetDate }}
              />
            </Suspense>
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

Page.defaultProps = {
  searchParams: {},
}

Page.propTypes = {
  addVisit: PropTypes.func.isRequired,
  deleteVisit: PropTypes.func.isRequired,
  editVisit: PropTypes.func.isRequired,
  searchVisits: PropTypes.func.isRequired,
  setSearchParams: PropTypes.func.isRequired,
  searchParams: PropTypes.object,
  visits: PropTypes.arrayOf(VISIT).isRequired,
}

export default Page
