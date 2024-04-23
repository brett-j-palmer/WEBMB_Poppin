import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (usernameError) setUsernameError(''); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
  
    if (username.length < 3) {
      setUsernameError('Usernames must be at least 3 characters long');
      valid = false;
    }
  
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }
  
    if (!valid) {
      return;
    }
  
    try {
      await axios.post('http://localhost:5001/users/add', { username, password });
      //console.log('User registered successfully:', { username, password });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setUsernameError('Username is already taken');
      } else {
        console.error('Registration failed:', error.response ? error.response.data.message : error.message);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <div className="Register">
          <h2>Register Page</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
            <br />
            <button type="submit" className="button" >Register</button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </header>
    </div>
  );
}

export default Register;
