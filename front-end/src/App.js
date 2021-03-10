import React from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepage from "./Homepage/Homepage";
import CalendarView from "./Calendar/CalendarView";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/calendar-month">
          <CalendarView />
        </Route>
        <Route exact path="/date/:date">
          <p>Some date</p>
        </Route>
        <Route exact path="/new">
          <p>new</p>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
