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

  const[selectedPost, setSelectedPost] = useState({
    box1: null,
    box2: null,
    box3: null,
    box4: null
  });
  const[posts, setPosts] = useState(JSON.parse(localStorage.getItem('createdPosts')) || []);
  //const[posts, setPosts] = useState([]);
  
  

  useEffect(()=> {
    const fetchData = async () => {
      try {
        await fetchPosts();
      } catch(error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5001/users/username/" + username);
      console.log('http://localhost:5001/users/created_posts/${username}');
      const user = response.data;
      const createdpostID = user.created_posts;
      console.log("Created Posts", createdpostID)

    

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
      localStorage.setItem('createdPosts', JSON.stringify(postwithIDS));
      console.log('Fetched posts:', postwithIDS);
      setPosts(postwithIDS);
      
    } catch(error) {
      console.error('Error fetching posts:', error);
    }
  };

  
  const handlePostSelection = (index, postID) => {
    setSelectedPost(prevState => {
      const newSelectedPosts = [...prevState];
      newSelectedPosts[index] = posts.find(post => post.id === postID) || null;
      return newSelectedPosts;
    });
  };

  return (
    <div className="App">
      <header className="profile-container">
        <div className="profile-header">
          <img src={profilePicture} className="profile-picture" alt=""/>
          <h2>{username}</h2>
        </div>
        <p className="profile-bio">{bio}</p>
        <div className="post-selections">
          {[1,2,3,4].map(box => (
            <div key={box} className = "post-selection">
              <h3>Select a Post:</h3>
              <select onChange={e => handlePostSelection('box${box}', e.target.value)}>
              <option value="">Your posts...</option>
              {posts.length > 0 && posts.map(post => (
                <option key={post.id} value={post.id}>{post.caption}</option>
              ))}
            </select>
            {selectedPost['box${box}'] && (
              <div className="selected-post">
              <h3>Selected Post:</h3>
              <PostItem
                id={selectedPost['box${box}'].id}
                username={selectedPost['box${box}'].username}
                file={selectedPost['box${box}'].file}
                caption={selectedPost['box${box}'].caption}
                rating={selectedPost['box${box}'].rating}
                tag={selectedPost['box${box}'].tag}
                comments={selectedPost['box${box}'].comments}
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