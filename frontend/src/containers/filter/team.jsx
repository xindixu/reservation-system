import React from "react"
import { startCase } from "lodash"
import Base from "./base-select"
import useTeams from "data/use-teams"

const Team = ({ t }) => {
  const { teams, loadingTeams, loadTeams } = useTeams()

  const props = {
    itemToString: (item) => item.name,
    label: startCase(t("common.team_plural")),
    loading: loadingTeams,
    mode: "",
    name: "teamId",
    onFocus: loadTeams,
    options: teams,
    t,
  }

  return <Base {...props} />
}

export default Team
