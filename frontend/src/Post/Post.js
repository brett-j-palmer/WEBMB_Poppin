import React, { useState } from "react";
import PostItem from "./PostItem";
import PostControl from "./PostControl";
import Comment from "./Comment";
import CommentControl from "./CommentControl";

function Post(props) {
  const [postItems, setPostItems] = useState([]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const currentUser = "User";

  const addItem = (text, file, caption, rating) => {
    const newItem = { id: postItems.length + 1, text, file, caption, rating };
    const newArray = [...postItems, newItem];
    setPostItems(newArray);
    setShowComments(true); 
  };

  const addComment = (user_comment) => {
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

  const removeItem = (id) => {
    const newArray = postItems.filter((item) => item.id !== id);
    setPostItems(newArray);
    setShowComments(false);
    removeComment = removeComment
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




