import { useLazyQuery, useMutation } from "@apollo/client"
import {
  GET_ALL_TEAMS,
  GET_TEAM_BY_ID,
  CREATE_TEAM,
  UPDATE_TEAM,
  ADD_MANAGERS_TO_TEAM,
} from "graphql/teams"
import { GET_ALL_MANAGERS } from "graphql/managers"
import { comparator } from "lib/utils"

const DEFAULT_SORT_ORDER = ["name", "id"]

const updateAfterCreate = (cache, { data: { createTeam } }) => {
  const team = createTeam

  try {
    const { teams } = cache.readQuery({ query: GET_ALL_TEAMS })
    const sortedTeams = [...teams, team].sort((a, b) => comparator(a, b, DEFAULT_SORT_ORDER))

    cache.writeQuery({
      query: GET_ALL_TEAMS,
      data: {
        teams: sortedTeams,
      },
    })
  } catch (error) {}
}

const updateAfterAddManagers = (cache, { data: { addManagersToTeam } }) => {
  const team = addManagersToTeam
  const { managers } = cache.readQuery({ query: GET_ALL_MANAGERS })

  managers.forEach((manager) => {
    if (team.managers.some((m) => m.id === manager.id && m.teamId !== team.id)) {
      manager.team = team
    }
  })
  cache.writeQuery({
    query: GET_ALL_MANAGERS,
    data: {
      managers,
    },
  })
}

// const updateAfterRemoveManagers = (cache, { data: { removeManagersFromTeam } }) => {
//   const team = removeManagersFromTeam
//   const { clients } = team
//   const { clients: prevManagers } = team
//   const deletedManagers = prevManagers.filter((pc) => !clients.some((c) => c.id === pc.id))
//   deletedManagers.forEach((client) => {
//     client.teams = (client.teams || []).filter((m) => m.id !== team.id)
//     cache.writeQuery({
//       query: GET_CLIENT_BY_ID,
//       variables: { id: client.id },
//       data: {
//         client,
//       },
//     })
//   })
// }

const useTeams = (id) => {
  const [
    loadTeams,
    {
      fetchMore,
      error: errorTeams,
      loading: loadingTeams,
      called: calledTeams,
      data: { teams = [] } = {},
    },
  ] = useLazyQuery(GET_ALL_TEAMS)

  // const fetchMoreTeams = () =>
  //   fetchMore({
  //     variables: {
  //       next: teams.next,
  //     },
  //     updateQuery: updateAfterFetchMore,
  //   })

  const [
    loadTeam,
    { error: errorTeam, loading: loadingTeam, called: calledTeam, data: { team = {} } = {} },
  ] = useLazyQuery(GET_TEAM_BY_ID, {
    variables: { id },
  })
  const [addTeam] = useMutation(CREATE_TEAM, {
    update: updateAfterCreate,
  })

  const [editTeam] = useMutation(UPDATE_TEAM)
  // const [deleteTeam] = useMutation(DESTROY_TEAM, {
  //   update: updateAfterDelete,
  // })

  const [addManagers] = useMutation(ADD_MANAGERS_TO_TEAM, {
    update: updateAfterAddManagers,
  })

  // const [removeManagers] = useMutation(REMOVE_CLIENTS_FROM_MANAGER, {
  //   update: updateAfterRemoveManagers,
  // })

  return {
    team,
    teams,
    errorTeam,
    errorTeams,
    loadingTeam: calledTeam ? loadingTeam : true,
    loadingTeams: calledTeams ? loadingTeams : true,
    loadTeam,
    loadTeams,
    // fetchMoreTeams,
    addTeam,
    editTeam,
    // deleteTeam,
    addManagers,
    // removeManagers,
  }
}
export default useTeams
