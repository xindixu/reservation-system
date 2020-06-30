import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Calendar from '../components/calendar'
import { GET_ALL_VISITS, DELETE_VISIT } from '../graphql/visits'

import VisitModal from '../components/visit-modal'

const MODALS = {
  addVisit: 'addVisit',
}

const CalendarPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_VISITS)
  const [deleteVisit] = useMutation(DELETE_VISIT)
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
      {modalToShow === MODALS.addVisit && <VisitModal onClose={() => setModalToShow('')} />}
    </>
  )
}


export default CalendarPage
