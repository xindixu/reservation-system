import React from "react"
import { startCase } from "lodash"
import Base from "./base-select"
import useTeams from "data/use-teams"

const Team = ({ t }) => {
  const { teams, loadingTeams, loadTeams } = useTeams()

  const props = {
    label: startCase(t("term.team_plural")),
    name: "teamId",
    onFocus: loadTeams,
    loading: loadingTeams,
    options: teams,
    itemToString: (item) => item.name,
    mode: "",
    t,
  }

  return <Base {...props} />
}

export default Team
