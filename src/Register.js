import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import icon from './icon.svg';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Register submitted with:', { username, password });

    setUsername('');
    setPassword('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={icon} className="App-icon" alt="icon" />

        <div className="Register">
          <h2>Register Page</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <br />
            <button type="submit">Register</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
