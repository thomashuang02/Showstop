import { React, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../css/App.css';
import Login from './Login';
import List from './List';
import { useCookies } from "react-cookie";

const App = (props) => {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(["mode"]);

  /* --------------------- updating dark mode from cookies -------------------- */
  const updateDarkMode = (mode) => {
    const body = document.querySelector("body");
    if (cookies.mode && mode === "dark") {
        body.style.backgroundColor="rgb(29, 29, 29)";
        body.style.color="white";
    }
    else {
        body.style.backgroundColor="white";
        body.style.color="black";
    }
  }
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <Router>
        <Switch>
          {/*home/login page*/}
          <Route exact path="/">
            <Login user={user} setUser={setUser} updateDarkMode={updateDarkMode}/>
          </Route>

          {/*list page*/}
          <Route path="/list">
            <List user={user} setUser={setUser} updateDarkMode={updateDarkMode}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
