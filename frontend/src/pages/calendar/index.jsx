import React, { useState } from "react"
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks"
import { isEmpty } from "lodash"
import { Spin } from "antd"
import Page from "./page"
import {
  GET_ALL_VISITS,
  SEARCH_VISITS,
  CREATE_VISIT,
  UPDATE_VISIT,
  DESTROY_VISIT,
} from "graphql/visits"

const updateAfterCreateVisit = ({ searching, searchParams }, cache, { data: { createVisit } }) => {
  const { visit } = createVisit

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
  const { loading: loadingAllVisits, error, data: allVisitData } = useQuery(GET_ALL_VISITS)
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

  if (error) {
    return `Error ${error.message}`
  }

  const visits = searching ? searchedVisitsData?.searchVisits : allVisitData?.visits
  const loading = searching ? loadingSearchVisits : loadingAllVisits
  return (
    <>
      <Spin spinning={loading}>
        <Page
          addVisit={addVisit}
          deleteVisit={deleteVisit}
          editVisit={editVisit}
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
