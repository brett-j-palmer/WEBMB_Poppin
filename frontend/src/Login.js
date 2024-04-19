import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext'; 
import './App.css';
import logo from './logo.svg';

function Login() {
  const [localUsername, setLocalUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const { setUsername } = useUser(); 

  const handleUsernameChange = (e) => {
    setLocalUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (!localUsername || !password) {
      setError('Both username and password are required.'); 
      return; 
    }

    try {
      const response = await axios.post('http://localhost:5001/users/login', { username: localUsername, password });
      console.log('Login successful:', response.data);
      setUsername(localUsername);
      navigate('/Post', {state: { username: localUsername}});
    } catch (error) {
      if (error.response) {
        switch(error.response.status) {
          case 404:
            setError('Username not found in the database.');
            break;
          case 401:
            setError('Password is incorrect.');
            break;
        }
      } else {
        setError('Login failed: ' + error.message);
      }
      if (error.message)
      {
      console.error('Login failed:', error.message);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Login">
          <h2>Login Page</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={localUsername} onChange={handleUsernameChange} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <br />
            <button type="submit" className="button">Login</button>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </header>
    </div>
  );
}

export default Login;
