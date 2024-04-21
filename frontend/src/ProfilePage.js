import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import './App.css';
import profilePicture from './Post/heart.png';
import PostItem from './Post/PostItem';
import axios from 'axios';
import { useUser } from './UserContext';
import { useParams } from 'react-router-dom';


function ProfilePage() {
  const { username: urlUsername } = useParams();
  const { username: loggedInUsername } = useUser(); 
  const isCurrentUser = !urlUsername || urlUsername === loggedInUsername; 

  const [editableBio, setEditableBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      const usernameToUse = urlUsername || loggedInUsername; 
      await fetchPosts(usernameToUse);
      await fetchUserBio(usernameToUse);
    };
    fetchData();
  }, [urlUsername, loggedInUsername]);

  const fetchPosts = async (username) => {
    try {
      const response = await axios.get(`http://localhost:5001/users/username/${username}`);
      const createdPostIDs = response.data.created_posts;

      const postsResponse = await axios.get('http://localhost:5001/posts');
      const postData = postsResponse.data.filter(post => createdPostIDs.includes(post._id));

      const postsWithIDs = postData.map(post => ({
        id: post._id,
        username: post.username,
        file: post.file,
        caption: post.caption,
        rating: post.rating,
        tag: post.tag,
        comments: post.comments
      }));

      localStorage.setItem('createdPosts', JSON.stringify(postsWithIDs));
      setPosts(postsWithIDs);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchUserBio = async (username) => {
    try {
      const response = await axios.get(`http://localhost:5001/users/username/${username}`);
      setEditableBio(response.data.bio || `I am ${username}. I love coding and coffee.`);
    } catch (error) {
      console.error('Error fetching user bio:', error);
    }
  };

  const handleBioChange = (event) => {
    setEditableBio(event.target.value);
  };

  const toggleEdit = () => {
    if (isCurrentUser) {
      setIsEditing(true);
    }
  };

  const saveBio = async () => {
    if (isCurrentUser) {
      try {
        const response = await axios.patch(`http://localhost:5001/users/updateBio/${loggedInUsername}`, { bio: editableBio });
        setIsEditing(false); 
        console.log('Bio updated successfully:', response.data); 
      } catch (error) {
        console.error('Error updating bio:', error);
      }
    }
  };

  const handlePostSelection = (box, postID) => {
    setSelectedPost(prevState => ({
      ...prevState,
      [box]: posts.find(post => post.id === postID) || null
    }));
  };

  return (
    <div className="App">
      <header className="profile-container">
        <div className="profile-header">
          <img src={profilePicture} alt="Profile" className="profile-picture" />
          <h2>@{urlUsername || loggedInUsername}</h2>
        </div>
        {isCurrentUser ? (
          isEditing ? (
            <div className="edit-bio-group">
              <textarea value={editableBio} onChange={(e) => setEditableBio(e.target.value)} />
              <button onClick={saveBio} className="button">Save Bio</button>
            </div>
          ) : (
            <div className="edit-bio-group">
              <p className="profile-bio">{editableBio}</p>
              <button onClick={toggleEdit} className="button">Edit Bio</button>
            </div>
          )
        ) : (
          <p className="profile-bio">{editableBio}</p>
        )}
        <div className="post-selections">
          {[1, 2, 3, 4].map(box => (
            <div key={box} className="post-selection">
              <h3>Select a Post:</h3>
              <select onChange={e => handlePostSelection(`box${box}`, e.target.value)}>
                <option value="">Your posts...</option>
                {posts.map(post => (
                  <option key={post.id} value={post.id}>{post.caption}</option>
                ))}
              </select>
              {selectedPost[`box${box}`] && (
                <div className="selected-post">
                  <h3>Selected Post:</h3>
                  <PostItem
                    id={selectedPost[`box${box}`].id}
                    username={selectedPost[`box${box}`].username}
                    file={selectedPost[`box${box}`].file}
                    caption={selectedPost[`box${box}`].caption}
                    rating={selectedPost[`box${box}`].rating}
                    tag={selectedPost[`box${box}`].tag}
                    comments={selectedPost[`box${box}`].comments}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
  
  
  
}

export default ProfilePage;
