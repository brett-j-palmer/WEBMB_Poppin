import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import PostControl from "./PostControl";
import Comment from "./Comment";


function Post(props) {
  const [postItems, setPostItems] = useState([]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const currentUser = "User";

 
  };
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        axios.get('http://localhost:5001/posts')
            .then(response => {
                // Map the response data to extract the id field
                const postsWithIds = response.data.map(post => ({
                    id: post._id,
                    file: post.file,
                    caption: post.caption,
                    rating: post.rating
                }));
                setPostItems(postsWithIds); // Update the state with fetched posts
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    };



    const addItem = (postData) => {
        axios.post('http://localhost:5001/posts/add', postData) // Send post data directly
            .then(response => {
                console.log('Post added successfully:', response.data);
                fetchPosts(); // Fetch posts after successful addition
            })
            .catch(error => {
                console.error('Error adding post:', error);
            });
    };

  const addComment = (user_comment) => {
    //if (currentUser && user_comment) {
    if (user_comment && currentUser) {
      const currentTime = new Date().toLocaleString();
      const newComment = {
        id: comments.length + 1,
        user: currentUser,
        userComment: user_comment,
        time: currentTime,
      };
      setComments([...comments, newComment]);
    }
  };

  const removeComment = (id) => {
    const newComments = comments.filter((comment) => comment.id !== id);
    setComments(newComments);
  };

  return (
    <div>
      <ul>
        {postItems.map((item) => (
          <PostItem
            key={item.id}
            id={item.id}
            file={item.file}
            text={item.text}
            caption={item.caption}
            rating={item.rating}
            removeItem={removeItem}
            
          />
        ))}

        {showComments &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              user={comment.user}
              userComment={comment.userComment}
              time={comment.time}
              removeComment={removeComment}
            />
          ))}
      </ul>
      <PostControl addItem={addItem} />
      {showComments && (
        <CommentControl addComment={addComment} currentUser={currentUser} />
      )}
    </div>
  );
}

export default Post