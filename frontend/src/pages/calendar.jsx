import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Calendar from '../components/calendar'
import { GET_ALL_VISITS, DELETE_VISIT } from '../graphql/visits'

import Modal from '../components/modal'
import VisitForm from '../components/visit-form'

const MODALS = {
  addVisit: 'addVisit',
}

const CalendarPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_VISITS)
  const [deleteVisit] = useMutation(DELETE_VISIT)

  const [visit, setVisit] = useState({ allDay: true })
  const [modalToShow, setModalToShow] = useState('')
  if (loading) {
    return 'loading...'
  }
  if (error) {
    return `Error ${error.message}`
  }

  return (
    <>
      <Calendar
        initialVisits={data.visits}
        deleteVisit={() => {}}
        addVisit={() => setModalToShow(MODALS.addVisit)}
      />
      {modalToShow === MODALS.addVisit
      && (
      <Modal
        title="Create New Visit"
        onClose={() => setModalToShow('')}
        onSubmit={() => {
          console.log()
        }}
      >
        <VisitForm visit={visit} setVisit={setVisit} />
      </Modal>
      )}
    </>
  )
}


export default CalendarPage
