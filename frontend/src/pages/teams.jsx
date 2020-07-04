import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_ALL_TEAMS, CREATE_TEAM } from "graphql/teams"
import TeamsGrid from "components/grid/teams-grid"

import Modal from "components/modal"
import TeamForm from "components/forms/team-form"
import FAButton from "components/floating-action-button"

const MODALS = {
  addTeam: "addTeam",
}

const Teams = () => {
  const { loading, error, data } = useQuery(GET_ALL_TEAMS)
  const [addTeam] = useMutation(CREATE_TEAM, {
    update: (cache, { data: { createTeam } }) => {
      const { team } = createTeam
      const { teams } = cache.readQuery({ query: GET_ALL_TEAMS })
      cache.writeQuery({
        query: GET_ALL_TEAMS,
        data: {
          teams: [...teams, team],
        },
      })
    },
  })
  const [team, setTeam] = useState()
  const [modalToShow, setModalToShow] = useState("")

  if (loading) {
    return "loading..."
  }
  if (error) {
    return `Error ${error.message}`
  }
  return (
    <>
      <TeamsGrid teams={data.teams} />
      {modalToShow === MODALS.addTeam && (
        <Modal
          title="Create New Team"
          onClose={() => setModalToShow("")}
          onSubmit={() => addTeam({ variables: team })}
          primaryButtonText="Create"
        >
          <TeamForm team={team} setTeam={setTeam} />
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addTeam)}
        ariaLabel="new Team"
        rotate={modalToShow}
      />
    </>
  )
}

export default Teams
