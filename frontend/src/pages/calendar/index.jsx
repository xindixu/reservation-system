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

const CalendarPage = () => {
  const [searchParams, setSearchParams] = useState({})
  const { loading: loadingAllVisits, error, data: allVisitData } = useQuery(GET_ALL_VISITS)
  const [searchVisits, { loading: loadingSearchVisits, data: searchedVisitsData }] = useLazyQuery(
    SEARCH_VISITS,
    {
      variables: searchParams,
    }
  )
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

  if (error) {
    return `Error ${error.message}`
  }

  const visits = isEmpty(searchParams) ? allVisitData?.visits : searchedVisitsData?.searchVisits
  const loading = isEmpty(searchParams) ? loadingAllVisits : loadingSearchVisits
  return (
    <>
      <Spin spinning={loading}>
        <Page
          visits={visits || []}
          setSearchParams={setSearchParams}
          searchVisits={searchVisits}
          editVisit={editVisit}
          deleteVisit={deleteVisit}
          addVisit={addVisit}
        />
      </Spin>
    </>
  )
}

export default CalendarPage
