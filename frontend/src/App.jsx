import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Teams from './pages/teams'
import Calendar from './pages/calendar'
import Navigation from './components/navigation-bar'

function App() {
  return (

    <Router>
      <Navigation />
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
      </Switch>
    </Router>

  )
}

export default App
