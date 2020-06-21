import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Teams from './pages/teams';
import Calendar from './pages/calendar';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Calendar />
        </Route>
        <Route path="/teams" exact>
          <Teams />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
