import React from 'react';
import './ProfilePage.css'; 
import './App.css';
import profilePicture from './Post/heart.png'; 


function ProfilePage() {
  const username = "Brett Palmer";
  const bio = "I am Brett Palmer. I love coding and coffee and Poppin.";

  return (
    <div className="App">
      <header className="profile-container">
        <div className="profile-header">
          <img src={profilePicture} className="profile-picture" />
          <h2>{username}</h2>
        </div>
        <p className="profile-bio">{bio}</p>
      </header>
    </div>
  );
}

export default ProfilePage;
