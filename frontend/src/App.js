import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import logo from './logo.svg';
import './App.css';
import Post from './Post/Post';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav>
          <Link to="/profile" className="button-link">Your Profile</Link>
        </nav>
        <Post text="This is some text...2" />
      </header>
    </div>
  );
}

export default App;
