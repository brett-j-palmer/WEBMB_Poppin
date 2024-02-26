import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import icon from './icon.svg';
import Post from './Post/Post';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={icon} className="App-icon" alt="icon" />

        <Post text="This is some text...2" />
        <Link to="/register">Go to Register</Link>
      </header>
    </div>
  );
}

export default App;
