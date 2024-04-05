import React, { useState, useEffect } from 'react';
import './ProfilePage.css'; 
import './App.css';
import profilePicture from './Post/heart.png'; 
import PostItem from './Post/PostItem';
import axios from 'axios';
import { useUser } from './UserContext'; 
function ProfilePage() {
  const { username } = useUser(); 
  const bio = `I am ${username}. I love coding and coffee and Poppin.`; 

  const[selectedPost, setSelectedPost] = useState(null);
  const[posts, setPosts] = useState([]);
  
  useEffect(()=> {
    const fetchData = async () => {
      try {
        await fetchPosts();
      } catch(error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchData();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/users/created_posts/${username}');
      const user = response.data;
      const createdpostID = user.created_posts;

      const postsResponse = await axios.get('http://localhost:5001/posts')
      const postData = postsResponse.data.filter(post => createdpostID.includes(post._id));

      const postwithIDS = postData.map(post => ({
        id: post._id,
        username: post.username,
        file: post.file,
        caption: post.caption,
        rating: post.rating,
        tag: post.tag,
        comments: post.comments
      }));
      console.log('Fetched posts:', postwithIDS);
      setPosts(postwithIDS);
    } catch(error) {
      console.error('Error fetching posts:', error);
    }
  };

  console.log(selectedPost);
  const handlePostSelection = postID => {
    console.log(postID);
    const post = posts.find(post => post.id === postID);
    console.log(":", post);
    setSelectedPost(post || null);
  };

  return (
    <div className="App">
      <header className="profile-container">
        <div className="profile-header">
          <img src={profilePicture} className="profile-picture" alt=""/>
          <h2>{username}</h2>
        </div>
        <p className="profile-bio">{bio}</p>
        <div className="post-selection">
          <h3>Select a Post:</h3>
          <select onChange={e => handlePostSelection(e.target.value)}>
            <option value="">Select a post...</option>
            {posts.length > 0 && posts.map(post => (
              <option key={post.id} value={post.id}>{post.caption}</option>
            ))}
          </select>
        </div>
        {selectedPost && (
          <div className="selected-post">
            <h3>Selected Post:</h3>
            <PostItem
              id={selectedPost.id}
              username={selectedPost.username}
              file={selectedPost.file}
              caption={selectedPost.caption}
              rating={selectedPost.rating}
              tag={selectedPost.tag}
              comments={selectedPost.comments}
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default ProfilePage;
