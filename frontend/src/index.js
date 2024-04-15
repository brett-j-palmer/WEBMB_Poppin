// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Register from './Register';
import Login from './Login';
import Post from './Post/Post';
import ProfilePage from './ProfilePage';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './UserContext'; 

ReactDOM.render(
  <Router>
    <UserProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<App />} />
        <Route path="/" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </UserProvider>
  </Router>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
