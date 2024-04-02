import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
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
        {/* Add a Link to the profile page here */}
        <nav>
          <Link to="/profile" style={{ color: '#761c47', textDecoration: 'none' }}>Go to Profile</Link>
        </nav>
        <Post text="This is some text...2" />
      </header>
    </div>
  );
}

export default App;
