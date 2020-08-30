import { useLazyQuery, useMutation } from "@apollo/client"
import { GET_ALL_VISITS, CREATE_VISIT, UPDATE_VISIT, DESTROY_VISIT } from "graphql/visits"
import { comparator } from "lib/utils"

const PAGE_SIZE = 20
const DEFAULT_SORT_ORDER = ["firstName", "lastName", "id"]

const updateAfterFetchMore = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult
  }
  const { visits } = fetchMoreResult.visits
  return {
    ...fetchMoreResult,
    visits: {
      ...fetchMoreResult.visits,
      visits: [...previousResult.visits.visits, ...visits],
    },
  }
}

const updateAfterDelete = (cache, { data: { destroyVisit } }) => {
  const visitId = destroyVisit
  const { visits } = cache.readQuery({
    query: GET_ALL_VISITS,
    variables: { size: PAGE_SIZE },
  })

  cache.writeQuery({
    query: GET_ALL_VISITS,
    variables: { size: PAGE_SIZE },
    data: {
      visits: {
        ...visits,
        visits: visits.visits.filter((c) => c.id !== visitId),
      },
    },
  })
}

const useVisits = (id) => {
  const [
    loadVisits,
    {
      fetchMore,
      error: errorVisits,
      loading: loadingVisits,
      called: calledVisits,
      data: { visits = [] } = {},
    },
  ] = useLazyQuery(GET_ALL_VISITS, {
    variables: { size: PAGE_SIZE },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  })

  const fetchMoreVisits = () =>
    fetchMore({
      variables: {
        next: visits.next,
      },
      updateQuery: updateAfterFetchMore,
    })

  // const [
  //   loadVisit,
  //   { error: errorVisit, loading: loadingVisit, called: calledVisit, data: { visit = {} } = {} },
  // ] = useLazyQuery(GET_VISIT_BY_ID, {
  //   variables: { id },
  // })

  const [addVisit] = useMutation(CREATE_VISIT, {
    update: updateAfterCreate,
  })

  const [editVisit] = useMutation(UPDATE_VISIT)
  const [deleteVisit] = useMutation(DESTROY_VISIT, {
    update: updateAfterDelete,
  })

  return {
    // visit,
    visits,
    // errorVisit,
    errorVisits,
    // loadingVisit: calledVisit ? loadingVisit : true,
    loadingVisits: calledVisits ? loadingVisits : true,
    // loadVisit,
    loadVisits,
    fetchMoreVisits,
    addVisit,
    editVisit,
    deleteVisit,
  }
}

export default useVisits
