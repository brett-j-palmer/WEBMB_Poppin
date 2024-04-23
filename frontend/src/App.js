import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; 
import { useUser } from './UserContext';
import logo from './logo.svg';
import './App.css';
import Post from './Post/Post';

function App() {
  const bottomRef = useRef(null); 
  const { username } = useUser();
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' }); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav>
        <Link to={`/profile/${username}`} className="button-link">Your Profile</Link>
          <button onClick={scrollToBottom} className="button-link" style={{ marginLeft: '10px' }}>Create a Post</button>
        </nav>
        <Post text="This is some text...2" />
      </header>
      <div ref={bottomRef} ></div>
    </div>
  );
}

export default App;
