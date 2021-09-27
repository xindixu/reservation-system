import { useQuery, useLazyQuery, useMutation } from "@apollo/client"
import { startOfMonth, endOfMonth } from "date-fns"
import { isEmpty } from "lodash"

import {
  SEARCH_VISITS,
  CREATE_VISIT,
  UPDATE_VISIT,
  DESTROY_VISIT,
  GET_VISITS_IN_RANGE,
} from "graphql/visits"
import { toISOStringWithTZ } from "lib/datetime"

const TODAY = new Date()
const DATE_FROM = toISOStringWithTZ(startOfMonth(TODAY))
const DATE_TO = toISOStringWithTZ(endOfMonth(TODAY))

const updateAfterCreateVisit = (
  { searching, searchParams, from, to },
  cache,
  { data: { createVisit } }
) => {
  const visit = createVisit

  if (searching) {
    const { clientIds, slotIds } = searchParams
    const { client, slot } = visit
    const q = { query: SEARCH_VISITS, variables: searchParams }
    if ((clientIds || []).includes(client.id) || (slotIds || []).includes(slot.id)) {
      const { searchVisits } = cache.readQuery(q)
      cache.writeQuery({
        ...q,
        data: {
          searchVisits: [...searchVisits, visit],
        },
      })
    }
  }

  const q = { query: GET_VISITS_IN_RANGE, variables: { from, to } }
  const { visitsInRange } = cache.readQuery(q)
  cache.writeQuery({
    ...q,
    data: {
      visitsInRange: [...visitsInRange, visit],
    },
  })
}

const updateAfterDeleteVisit = (
  { searching, searchParams, from, to },
  cache,
  { data: { destroyVisit } }
) => {
  const visitId = destroyVisit
  if (searching) {
    const q = { query: SEARCH_VISITS, variables: searchParams }
    const { searchVisits } = cache.readQuery(q)
    cache.writeQuery({
      ...q,
      data: {
        searchVisits: searchVisits.filter((v) => v.id !== visitId),
      },
    })
  }

  const q = { query: GET_VISITS_IN_RANGE, variables: { from, to } }
  const { visitsInRange } = cache.readQuery(q)
  cache.writeQuery({
    ...q,
    data: {
      visitsInRange: visitsInRange.filter((v) => v.id !== visitId),
    },
  })
}

const useVisits = ({ searchParams }) => {
  const searching = !isEmpty(searchParams)

  const {
    loading: loadingAllVisits,
    error: errorAllVisits,
    data: allVisitData,
    refetch,
  } = useQuery(GET_VISITS_IN_RANGE, {
    variables: {
      from: DATE_FROM,
      to: DATE_TO,
    },
  })
  const [searchVisits, { loading: loadingSearchVisits, data: searchedVisitsData }] = useLazyQuery(
    SEARCH_VISITS,
    {
      variables: searchParams,
    }
  )
  const [addVisit] = useMutation(CREATE_VISIT, {
    update: (...args) =>
      updateAfterCreateVisit({ searching, searchParams, from: DATE_FROM, to: DATE_TO }, ...args),
  })

  const [editVisit] = useMutation(UPDATE_VISIT)
  const [deleteVisit] = useMutation(DESTROY_VISIT, {
    update: (...args) =>
      updateAfterDeleteVisit({ searching, searchParams, from: DATE_FROM, to: DATE_TO }, ...args),
  })

  const refetchAndUpdate = ({ start, end }) =>
    start && end && refetch({ from: toISOStringWithTZ(start), to: toISOStringWithTZ(end) })

  return {
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
  }
}

export default useVisits
