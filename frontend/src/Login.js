import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext'; 

function Login() {
  const [localUsername, setLocalUsername] = useState(''); 
  const [password, setPassword] = useState('');
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
    try {
      const response = await axios.post('http://localhost:5001/users/login', { username: localUsername, password });
      console.log('Login successful:', response.data);
      setUsername(localUsername); 
      navigate('/Post', {state: { username: localUsername}});
    } catch (error) {
      console.error('Login failed:', error.message);
    }

    setLocalUsername('');
    setPassword('');
  };

  return (
    <div className="App">
      <header className="App-header">
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
            <button type="submit">Login</button>
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
