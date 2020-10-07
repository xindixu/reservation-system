import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import TeamsGrid from "components/grid/teams-grid"
import Modal from "components/modal"
import TeamForm from "components/forms/team-form"
import FAButton from "components/floating-action-button"
import useTeams from "data/use-teams"

const MODALS = {
  addTeam: "addTeam",
}

const Teams = () => {
  const { t } = useTranslation()
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
        <Modal
          title={`${t("common.create")} ${t("common.team")}`}
          onClose={() => setModalToShow("")}
          submitButtonText={t("common.create")}
        >
          {({ form }) => (
            <TeamForm form={form} onSubmit={(values) => addTeam({ variables: values })} />
          )}
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addTeam)}
        ariaLabel={`${t("common.create")} ${t("common.team")}`}
        rotate={!!modalToShow}
      />
    </>
  )
}

export default Teams
