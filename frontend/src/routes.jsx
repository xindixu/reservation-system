import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { isEmpty, startCase } from "lodash"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"

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

const Title = ({ page }) => {
  const { t } = useTranslation()

  return (
    <Helmet>
      <title>
        {startCase(t(`common.${page}`))} | {startCase(t("common.reservationSystem"))}
      </title>
    </Helmet>
  )
}
export const AppRoutes = () => (
  <Switch>
    <PrivateRoute path="/" exact>
      <Title page="calendar" />
      <Calendar />
    </PrivateRoute>
    <PrivateRoute path="/calendar" exact>
      <Title page="calendar" />
      <Calendar />
    </PrivateRoute>
    <PrivateRoute path="/settings" exact>
      <Title page="settings" />
      <Settings />
    </PrivateRoute>
    <PrivateRoute path="/teams" exact>
      <Title page="team_plural" />
      <Teams />
    </PrivateRoute>
    <PrivateRoute path="/managers" exact>
      <Title page="manager_plural" />
      <Managers />
    </PrivateRoute>
    <PrivateRoute path="/clients" exact>
      <Title page="client_plural" />
      <Clients />
    </PrivateRoute>
    <PrivateRoute path="/slots" exact>
      <Title page="slot_plural" />
      <Slots />
    </PrivateRoute>
    <PrivateRoute path="/team/:id" exact>
      <Title page="team" />
      <Team />
    </PrivateRoute>
    <PrivateRoute path="/manager/:id" exact>
      <Title page="manager" />
      <Manager />
    </PrivateRoute>
    <PrivateRoute path="/client/:id" exact>
      <Title page="client" />
      <Client />
    </PrivateRoute>
    <PrivateRoute path="/slot/:id" exact>
      <Title page="slot" />
      <Slot />
    </PrivateRoute>
    <PublicRoute path="/sign-in" exact>
      <Title page="signIn" />
      <SignIn />
    </PublicRoute>
    <PublicRoute path="/sign-up" exact>
      <Title page="signUp" />
      <SignUp />
    </PublicRoute>
    <PublicRoute>
      <Redirect to="/sign-in" />
    </PublicRoute>
  </Switch>
)
