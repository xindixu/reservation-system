import React from "react"
import Base from "./base"
import useTeams from "data/use-teams"

const Team = () => {
  const { teams, loadingTeams, loadTeams } = useTeams()

  const props = {
    label: "Teams",
    name: "teamId",
    onFocus: loadTeams,
    loading: loadingTeams,
    options: teams,
    itemToString: (item) => item.name,
    mode: "",
  }

  return <Base {...props} />
}

export default Team
