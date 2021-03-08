import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './Scenes/Dashboard/Dashboard'
import Preferences from './Scenes/Preferences/Preferences'
import Login from './Scenes/Login/Login'
import useToken from './useToken'

import './App.css'


function App() {
  const { token, setToken } = useToken()
  
  if(token) {
    return <Login setToken={setToken} />
  }

  const handleLogoutClick = () => {
    //sessionStorage.clear();
    //localStorage.clear()
    //window.location.reload()
    //localStorage.clear('token')
    //localStorage.removeItem(key);
  }
  
  return (
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/preferences">
              <Preferences />
            </Route>
          </Switch>
        </BrowserRouter>
      {
        token && <button onClick={handleLogoutClick}>logout</button>
      }
    </div>
  );
}

export default App;
