import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Current from './Current'
import Forcast from './Forcast'
  
export default function Nav()
{
    return (
      <Router>
        <div>
          <ul className="list-unstyled d-flex flex-row justify-content-center">
            <li className="mx-3 py-3">
              <Link to="/">Current Weather</Link>
            </li>
            <li className="mx-3 py-3">
              <Link to="/forcast">5 Day Forcast</Link>
            </li>
          </ul>
          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            <Route exact path="/">
              <Current />
            </Route>
            <Route path="/forcast">
              <Forcast />
            </Route>
          </Switch>
        </div>
      </Router>
    )
}