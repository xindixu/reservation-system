import React from "react"
import { Switch, Route } from "react-router-dom"
import Teams from "./pages/teams"
import Managers from "./pages/managers"
import Team from "./pages/team"
import Calendar from "./pages/calendar"

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <Calendar />
    </Route>
    <Route path="/calendar" exact>
      <Calendar />
    </Route>
    <Route path="/teams" exact>
      <Teams />
    </Route>
    <Route path="/managers" exact>
      <Managers />
    </Route>
    <Route path="/team/:id" exact>
      <Team />
    </Route>
  </Switch>
)

export default Routes
