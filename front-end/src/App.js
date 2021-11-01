import { React, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Login from './Login/Login';
import List from './List/List';

const App = (props) => {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <Router>
        <Switch>
          {/*home/login page*/}
          <Route exact path="/">
            <Login user={user} setUser={setUser}/>
          </Route>

          {/*list page*/}
          <Route path="/list">
            <List user={user} setUser={setUser}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
