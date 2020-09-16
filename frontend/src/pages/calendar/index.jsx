import React, { useState } from "react"
import { useQuery, useLazyQuery, useMutation } from "@apollo/client"
import { isEmpty } from "lodash"
import { Spin } from "antd"
import Page from "./page"
import {
  GET_ALL_VISITS,
  SEARCH_VISITS,
  CREATE_VISIT,
  UPDATE_VISIT,
  DESTROY_VISIT,
  GET_VISITS_IN_RANGE,
} from "graphql/visits"
import { toISOStringWithTZ } from "lib/datetime"

const updateAfterCreateVisit = ({ searching, searchParams }, cache, { data: { createVisit } }) => {
  const visit = createVisit

  if (searching) {
    const { clientIds, slotIds } = searchParams
    const { client, slot } = visit

    if ((clientIds || []).includes(client.id) || (slotIds || []).includes(slot.id)) {
      const { searchVisits } = cache.readQuery({ query: SEARCH_VISITS, variables: searchParams })
      cache.writeQuery({
        query: SEARCH_VISITS,
        variables: searchParams,
        data: {
          searchVisits: [...searchVisits, visit],
        },
      })
    }
  }
  const { visits } = cache.readQuery({ query: GET_ALL_VISITS })
  cache.writeQuery({
    query: GET_ALL_VISITS,
    data: {
      visits: [...visits, visit],
    },
  })
}

const CalendarPage = () => {
  const [searchParams, setSearchParams] = useState({})
  const searching = !isEmpty(searchParams)
  const { loading: loadingAllVisits, error, data: allVisitData, refetch } = useQuery(
    GET_VISITS_IN_RANGE,
    {
      variables: {
        from: "2020-09-01T00:00:00.000Z",
        to: "2020-10-01T00:00:00.000Z",
      },
    }
  )
  const [searchVisits, { loading: loadingSearchVisits, data: searchedVisitsData }] = useLazyQuery(
    SEARCH_VISITS,
    {
      variables: searchParams,
    }
  )
  const [addVisit] = useMutation(CREATE_VISIT, {
    update: (...args) => updateAfterCreateVisit({ searching, searchParams }, ...args),
  })

  const [editVisit] = useMutation(UPDATE_VISIT)
  const [deleteVisit] = useMutation(DESTROY_VISIT, {
    update: (cache, { data: { destroyVisit } }) => {
      const visitId = destroyVisit
      const { visits } = cache.readQuery({ query: GET_ALL_VISITS })
      cache.writeQuery({
        query: GET_ALL_VISITS,
        data: {
          visits: visits.filter((v) => v.id !== visitId),
        },
      })
    },
  })

  if (error) {
    return `Error ${error.message}`
  }

  const visits = searching ? searchedVisitsData?.searchVisits : allVisitData?.visitsInRange
  const loading = searching ? loadingSearchVisits : loadingAllVisits

  const refetchAndUpdate = ({ start, end }) =>
    start && end && refetch({ from: toISOStringWithTZ(start), to: toISOStringWithTZ(end) })

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
