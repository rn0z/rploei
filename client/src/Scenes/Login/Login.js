import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Login.css';

async function loginUser(credentials) {
  return fetch('http://127.0.0.1:5000/login', {
       method: 'GET', 
      headers: new Headers({
     'Authorization': 'Basic '+ btoa(`${credentials.username}:${credentials.password}`), 
     'Content-Type': 'application/x-www-form-urlencoded'
   }), 
  })
  .then(
    data => {
     return data.json()
    }
  )
    /*headers.set('Authorization', 'Basic bW9zOjEyMw==');
    headers.set('Authorization', 'Basic ' + btoa(credentials.username + ":" + credentials.password));
 return await axios.get('http://127.0.0.1:5000/login', {
     'headers': {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Access-Control-Allow-Origin': '*',
         'Authorization': 'Basic ' + btoa(credentials.username + ":" + credentials.password)
     }
 })*/
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

    const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    console.log(token);
    setToken(token);
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};