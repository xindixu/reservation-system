import React from "react"
import { Switch, Route } from "react-router-dom"
import Teams from "./pages/teams"
import Managers from "./pages/managers"
import Clients from "./pages/clients"
import Slots from "./pages/slots"
import Team from "./pages/team"
import Manager from "./pages/manager"
import Client from "./pages/client"
import Slot from "./pages/slot"
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
    <Route path="/clients" exact>
      <Clients />
    </Route>
    <Route path="/slots" exact>
      <Slots />
    </Route>
    <Route path="/team/:id" exact>
      <Team />
    </Route>
    <Route path="/manager/:id" exact>
      <Manager />
    </Route>
    <Route path="/client/:id" exact>
      <Client />
    </Route>
    <Route path="/slot/:id" exact>
      <Slot />
    </Route>
  </Switch>
)

export default Routes
