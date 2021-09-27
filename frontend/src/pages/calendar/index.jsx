import React, { useState } from "react"

import { isEmpty } from "lodash"
import { Spin } from "antd"
import Page from "./page"

import useVisits from "data/use-visits"

// const DATE_FROM = toISOStringWithTZ(startOfMonth(TODAY))
// const DATE_TO = toISOStringWithTZ(endOfMonth(TODAY))

const CalendarPage = () => {
  const [searchParams, setSearchParams] = useState({})

  const {
    allVisitData,
    errorAllVisits,
    loadingAllVisits,
    loadingSearchVisits,
    searchedVisitsData,
    addVisit,
    deleteVisit,
    editVisit,
    refetchAndUpdate,
    searchVisits,
  } = useVisits({})
  const searching = !isEmpty(searchParams)

  if (errorAllVisits) {
    return `Error ${errorAllVisits.message}`
  }

  const visits = searching ? searchedVisitsData?.searchVisits : allVisitData?.visitsInRange
  const loading = searching ? loadingSearchVisits : loadingAllVisits

  return (
    <>
      <Spin spinning={loading}>
        <Page
          addVisit={addVisit}
          deleteVisit={deleteVisit}
          editVisit={editVisit}
          onRangeChange={refetchAndUpdate}
          searchParams={searchParams}
          searchVisits={searchVisits}
          setSearchParams={setSearchParams}
          visits={visits || []}
        />
      </Spin>
    </>
  )
}

export default CalendarPage
