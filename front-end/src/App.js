import React from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepage from "./Homepage/Homepage";
import MyCalendar from "./Calendar/MyCalendar";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/calendar-month">
          <MyCalendar />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
