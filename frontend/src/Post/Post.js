import React, { useState } from "react";
import PostItem from "./PostItem";
import PostControl from "./PostControl";
import Comment from "./Comment";



function Post(props) {
    const [postItems, setPostItems] = useState([]);
    const [comments, setComments] = useState([]);
    const currentUser = "User";

    const addItem = (text, file, caption, rating) => {
        const newItem = { id: postItems.length + 1, text, file, caption, rating };
        const newArray = [...postItems, newItem];
        setPostItems(newArray);
    };

    const addComment = (user_comment) => {
        if (currentUser && user_comment) {
            const newComment = { id: comments.length + 1, user: currentUser, user_comment };
            setComments([...comments, newComment]);
        }
    };

    const removeItem = (id) => {
        const newArray = postItems.filter((item) => item.id !== id);
        setPostItems(newArray);
    };

    const removeComment = (id) => {
        const newComments = comments.filter((comment) => comment.id !== id);
        setComments(newComments);
    };

    return (
        <div>
            <ul>
                {postItems.map(item => (
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
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        id={comment.id}
                        user={comment.user}
                        user_comment={comment.user_comment}
                        removeComment={removeComment}
                    />
                ))}
            </ul>
            <PostControl addItem={addItem} />
            
        </div>
    );
}

export default Post;

