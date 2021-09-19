import { useState } from "react"
import { useLazyQuery, useMutation } from "@apollo/client"
import {
  GET_ALL_CLIENTS,
  GET_PAGINATED_CLIENTS,
  GET_CLIENT_BY_ID,
  SEARCH_CLIENTS,
  CREATE_CLIENT,
  UPDATE_CLIENT,
  DESTROY_CLIENT,
} from "graphql/clients"
import { comparator } from "lib/utils"

const PAGE_SIZE = 20
const DEFAULT_SORT_ORDER = ["firstName", "lastName", "id"]

const updateAfterFetchMore = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult
  }
  const { clients } = fetchMoreResult.clients
  return {
    ...fetchMoreResult,
    clients: {
      ...fetchMoreResult.clients,
      clients: [...previousResult.clients.clients, ...clients],
    },
  }
}

const updateAfterCreate = (cache, { data: { createClient } }) => {
  const client = createClient
  try {
    const { clients } = cache.readQuery({
      query: GET_PAGINATED_CLIENTS,
      variables: { size: PAGE_SIZE },
    })

    const sortedClients = [...clients.clients, client].sort((a, b) =>
      comparator(a, b, DEFAULT_SORT_ORDER)
    )

    cache.writeQuery({
      query: GET_PAGINATED_CLIENTS,
      variables: { size: PAGE_SIZE },
      data: {
        clients: {
          ...clients,
          clients: sortedClients,
        },
      },
    })
  } catch (error) {}
}

const updateAfterDelete = (cache, { data: { destroyClient } }) => {
  const clientId = destroyClient
  const { clients } = cache.readQuery({
    query: GET_PAGINATED_CLIENTS,
    variables: { size: PAGE_SIZE },
  })

  cache.writeQuery({
    query: GET_PAGINATED_CLIENTS,
    variables: { size: PAGE_SIZE },
    data: {
      clients: {
        ...clients,
        clients: clients.clients.filter((c) => c.id !== clientId),
      },
    },
  })
}

const useClients = (id) => {
  const [filters, setFilters] = useState({})

  const [
    loadClients,
    {
      fetchMore,
      refetch,
      error: errorClients,
      loading: loadingClients,
      called: calledClients,
      data: { clients = {} } = {},
    },
  ] = useLazyQuery(GET_PAGINATED_CLIENTS, {
    variables: { size: PAGE_SIZE },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  })

  const fetchMoreClients = () =>
    fetchMore({
      variables: {
        next: clients.next,
      },
      updateQuery: updateAfterFetchMore,
    })

  const [
    loadAllClients,
    { loading: loadingAllClients, called: calledAllClients, data: { allClients = [] } = {} },
  ] = useLazyQuery(GET_ALL_CLIENTS)

  const [
    loadClient,
    {
      error: errorClient,
      loading: loadingClient,
      called: calledClient,
      data: { client = {} } = {},
    },
  ] = useLazyQuery(GET_CLIENT_BY_ID, {
    variables: { id },
  })

  const [search, { data: { searchClients = [] } = {}, loading: searching }] = useLazyQuery(
    SEARCH_CLIENTS,
    {
      variables: { q: "" },
    }
  )

  const [addClient] = useMutation(CREATE_CLIENT, {
    update: updateAfterCreate,
  })

  const [editClient] = useMutation(UPDATE_CLIENT)
  const [deleteClient] = useMutation(DESTROY_CLIENT, {
    update: updateAfterDelete,
  })

  return {
    allClients,
    client,
    clients,
    errorClient,
    errorClients,
    loadingAllClients: calledAllClients ? loadingAllClients : true,
    loadingClient: calledClient ? loadingClient : true,
    loadingClients: calledClients ? loadingClients : true,
    searchClients,
    searching,
    addClient,
    deleteClient,
    editClient,
    fetchClients: fetchMore,
    fetchMoreClients,
    loadAllClients,
    loadClient,
    loadClients,
    search,
    setClientFilters: (newFilters) => {
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

export default useClients
