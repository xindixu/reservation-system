import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { isEmpty } from "lodash"

// TODO: lazy load all these
import Teams from "./pages/teams"
import Managers from "./pages/managers"
import Clients from "./pages/clients"
import Slots from "./pages/slots"
import Team from "./pages/team"
import Manager from "./pages/manager"
import Client from "./pages/client"
import Slot from "./pages/slot"
import Calendar from "./pages/calendar"
import Settings from "./pages/settings"
import SignUp from "./pages/sign-up"
import SignIn from "./pages/sign-in"
import { useUserContext } from "./contexts/user-context"

const publicRoutes = ["/sign-in", "/sign-up"]

const PrivateRoute = ({ ...rest }) => {
  const { user } = useUserContext()
  if (isEmpty(user)) {
    return <Redirect to="/sign-in" />
  }

  return <Route {...rest} />
}

const PublicRoute = ({ ...rest }) => {
  const { user } = useUserContext()
  const { pathname } = window.location

  if (!isEmpty(user) && publicRoutes.includes(pathname)) {
    return <Redirect to="calendar" />
  }
  return <Route {...rest} />
}

export const AppRoutes = () => (
  <Switch>
    <PrivateRoute path="/" exact component={Calendar} />
    <PrivateRoute path="/calendar" exact component={Calendar} />
    <PrivateRoute path="/teams" exact component={Teams} />
    <PrivateRoute path="/managers" exact component={Managers} />
    <PrivateRoute path="/clients" exact component={Clients} />
    <PrivateRoute path="/settings" exact component={Settings} />
    <PrivateRoute path="/slots" exact component={Slots} />
    <PrivateRoute path="/team/:id" exact component={Team} />
    <PrivateRoute path="/manager/:id" exact component={Manager} />
    <PrivateRoute path="/client/:id" exact component={Client} />
    <PrivateRoute path="/slot/:id" exact component={Slot} />
    <PublicRoute path="/sign-in" exact component={SignIn} />
    <PublicRoute path="/sign-up" exact component={SignUp} />
    <PublicRoute>
      <Redirect to="/sign-in" />
    </PublicRoute>
  </Switch>
)
