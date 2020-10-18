import { useState } from "react"
import { useLazyQuery, useMutation } from "@apollo/client"
import {
  GET_ALL_SLOTS,
  GET_SLOT_BY_ID,
  CREATE_SLOT,
  UPDATE_SLOT,
  DESTROY_SLOT,
} from "graphql/slots"
import { GET_ALL_VISITS } from "graphql/visits"

const PAGE_SIZE = 20

const updateAfterFetchMore = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult
  }
  const { slots } = fetchMoreResult.slots
  return {
    ...fetchMoreResult,
    slots: {
      ...fetchMoreResult.slots,
      slots: [...previousResult.slots.slots, ...slots],
    },
  }
}

const updateAfterCreate = (cache, { data: { createSlot } }) => {
  const slot = createSlot
  const { slots } = cache.readQuery({ query: GET_ALL_SLOTS })
  cache.writeQuery({
    query: GET_ALL_SLOTS,
    data: {
      slots: [...slots, slot],
    },
  })
}

const updateAfterDelete = (cache, { data: { destroySlot } }) => {
  const slot = destroySlot
  const slots = cache.readQuery({ query: GET_ALL_SLOTS })
  const visits = cache.readQuery({ query: GET_ALL_VISITS })
  cache.writeQuery({
    query: GET_ALL_SLOTS,
    data: {
      slots: slots.filter((s) => s.id !== slot),
    },
  })
  cache.writeQuery({
    query: GET_ALL_VISITS,
    data: {
      visits: visits.filter((v) => v.slot.id !== slot),
    },
  })
}

const useSlots = (id) => {
  const [filters, setFilters] = useState({})

  const [
    loadSlots,
    {
      fetchMore,
      refetch,
      error: errorSlots,
      loading: loadingSlots,
      called: calledSlots,
      data: { slots = {} } = {},
    },
  ] = useLazyQuery(GET_ALL_SLOTS, {
    variables: { size: PAGE_SIZE },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  })

  const fetchMoreSlots = () =>
    fetchMore({
      variables: {
        next: slots.next,
      },
      updateQuery: updateAfterFetchMore,
    })

  const [
    loadSlot,
    { error: errorSlot, loading: loadingSlot, called: calledSlot, data: { slot = {} } = {} },
  ] = useLazyQuery(GET_SLOT_BY_ID, {
    variables: { id },
  })
  const [addSlot] = useMutation(CREATE_SLOT, {
    update: updateAfterCreate,
  })

  const [editSlot] = useMutation(UPDATE_SLOT)
  const [deleteSlot] = useMutation(DESTROY_SLOT, {
    update: updateAfterDelete,
  })

  return {
    slot,
    slots,
    errorSlot,
    errorSlots,
    loadingSlot: calledSlot ? loadingSlot : true,
    loadingSlots: calledSlots ? loadingSlots : true,
    loadSlot,
    loadSlots,
    fetchMoreSlots,
    addSlot,
    editSlot,
    deleteSlot,
    setSlotFilters: (newFilters) => {
      if (filters === newFilters) {
        return
      }
      setFilters(newFilters)
      return refetch({
        filters: newFilters,
      })
    },
  }
}
export default useSlots
