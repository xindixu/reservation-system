import { useLazyQuery, useMutation } from "@apollo/client"
import {
  GET_ALL_MANAGERS,
  GET_MANAGER_BY_ID,
  SEARCH_MANAGERS,
  CREATE_MANAGER,
  UPDATE_MANAGER,
  REMOVE_CLIENTS_FROM_MANAGER,
  ADD_CLIENTS_TO_MANAGER,
} from "graphql/managers"
import { GET_CLIENT_BY_ID } from "graphql/clients"

const PAGE_SIZE = 20

const updateAfterFetchMore = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult
  }
  const { managers } = fetchMoreResult.managers
  return {
    ...fetchMoreResult,
    managers: {
      ...fetchMoreResult.managers,
      managers: [...previousResult.managers.managers, ...managers],
    },
  }
}

const updateAfterCreate = (cache, { data: { createManager } }) => {
  const manager = createManager
  try {
    const { managers } = cache.readQuery({ query: GET_ALL_MANAGERS })
    cache.writeQuery({
      query: GET_ALL_MANAGERS,
      data: {
        managers: [...managers, manager],
      },
    })
  } catch (error) {}
}

const updateAfterAddClients = (cache, { data: { addClientsToManager } }) => {
  const manager = addClientsToManager
  const { clients } = manager
  const { clients: prevClients } = manager
  const addedClients = clients.filter((pc) => !prevClients.some((c) => c.id === pc.id))
  addedClients.forEach((client) => {
    client.managers = [...client.managers, manager]
    cache.writeQuery({
      query: GET_CLIENT_BY_ID,
      variables: { id: client.id },
      data: {
        client,
      },
    })
  })
}

const updateAfterRemoveClients = (cache, { data: { removeClientsFromManager } }) => {
  const manager = removeClientsFromManager
  const { clients } = manager
  const { clients: prevClients } = manager
  const deletedClients = prevClients.filter((pc) => !clients.some((c) => c.id === pc.id))
  deletedClients.forEach((client) => {
    client.managers = (client.managers || []).filter((m) => m.id !== manager.id)
    cache.writeQuery({
      query: GET_CLIENT_BY_ID,
      variables: { id: client.id },
      data: {
        client,
      },
    })
  })
}

const useManagers = (id) => {
  const [
    loadManagers,
    {
      fetchMore,
      error: errorManagers,
      loading: loadingManagers,
      called: calledManagers,
      data: { managers = {} } = {},
    },
  ] = useLazyQuery(GET_ALL_MANAGERS, {
    variables: { size: PAGE_SIZE },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  })

  const fetchMoreManagers = () =>
    fetchMore({
      variables: {
        next: managers.next,
      },
      updateQuery: updateAfterFetchMore,
    })

  const [
    loadManager,
    {
      error: errorManager,
      loading: loadingManager,
      called: calledManager,
      data: { manager = {} } = {},
    },
  ] = useLazyQuery(GET_MANAGER_BY_ID, {
    variables: { id },
  })

  const [search, { data: { searchManagers = [] } = {}, loading: searching }] = useLazyQuery(
    SEARCH_MANAGERS,
    {
      variables: { q: "" },
    }
  )

  const [addManager] = useMutation(CREATE_MANAGER, {
    update: updateAfterCreate,
  })

  const [editManager] = useMutation(UPDATE_MANAGER)
  // const [deleteManager] = useMutation(DESTROY_MANAGER, {
  //   update: updateAfterDelete,
  // })

  const [addClients] = useMutation(ADD_CLIENTS_TO_MANAGER, {
    update: updateAfterAddClients,
  })

  const [removeClients] = useMutation(REMOVE_CLIENTS_FROM_MANAGER, {
    update: updateAfterRemoveClients,
  })

  return {
    manager,
    managers,
    searchManagers,
    errorManager,
    errorManagers,
    loadingManager: calledManager ? loadingManager : true,
    loadingManagers: calledManagers ? loadingManagers : true,
    searching,
    loadManager,
    loadManagers,
    fetchMoreManagers,
    search,
    addManager,
    editManager,
    // deleteManager,
    addClients,
    removeClients,
  }
}
export default useManagers
