import React, { useState, useEffect } from "react"
import TeamsGrid from "components/grid/teams-grid"
import Modal from "components/modal"
import TeamForm from "components/forms/team-form"
import FAButton from "components/floating-action-button"
import useTeams from "data/use-teams"

const MODALS = {
  addTeam: "addTeam",
}

const Teams = () => {
  const { teams, errorTeams, loadingTeams, loadTeams, addTeam } = useTeams()
  const [modalToShow, setModalToShow] = useState("")

  useEffect(() => {
    loadTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loadingTeams) {
    return "loading..."
  }
  if (errorTeams) {
    return `Error ${errorTeams.message}`
  }
  return (
    <>
      <TeamsGrid teams={teams} />
      {modalToShow === MODALS.addTeam && (
        <Modal title="Create New Team" onClose={() => setModalToShow("")} submitButtonText="Create">
          {({ form }) => (
            <TeamForm form={form} onSubmit={(values) => addTeam({ variables: values })} />
          )}
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addTeam)}
        ariaLabel="new Team"
        rotate={!!modalToShow}
      />
    </>
  )
}

export default Teams
