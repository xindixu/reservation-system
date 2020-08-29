import { useLazyQuery, useMutation } from "@apollo/react-hooks"
import {
  GET_ALL_SLOTS,
  GET_SLOT_BY_ID,
  CREATE_SLOT,
  UPDATE_SLOT,
  DESTROY_SLOT,
} from "graphql/slots"
import { GET_ALL_VISITS } from "graphql/visits"

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
  const [
    loadSlots,
    {
      fetchMore,
      error: errorSlots,
      loading: loadingSlots,
      called: calledSlots,
      data: { slots = [] } = {},
    },
  ] = useLazyQuery(GET_ALL_SLOTS)

  // const fetchMoreSlots = () =>
  //   fetchMore({
  //     variables: {
  //       next: slots.next,
  //     },
  //     updateQuery: updateAfterFetchMore,
  //   })

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
    // fetchMoreSlots,
    addSlot,
    editSlot,
    deleteSlot,
  }
}
export default useSlots
