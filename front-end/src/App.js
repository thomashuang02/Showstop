import { React, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Login from './Login/Login';

const App = (props) => {
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <Router>
        <Switch>
          {/*home/login page*/}
          <Route exact path="/">
            <Login></Login>
          </Route>

          {/*list page*/}
          <Route path="/list">
            
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
