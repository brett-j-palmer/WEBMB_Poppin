import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import PostControl from "./PostControl";
import Comment from "./Comment";
import CommentControl from "./CommentControl";
import axios from 'axios';

function Post(props) {
    const [postItems, setPostItems] = useState([]);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [commentsLoaded, setCommentsLoaded] = useState(false);

    useEffect(() => {
        fetchPosts();
        // postItems.forEach(post => fetchCommentsByPostId(post.id));
        // setCommentsLoaded(false);
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
                setPostItems(postsWithIds); 

                postsWithIds.forEach(post => {
                    fetchCommentsByPostId(post.id);
                });
                // setCommentsLoaded(true);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    };

    const addItem = (postData) => {
        axios.post('http://localhost:5001/posts/add', postData) 
            .then(response => {
                console.log('Post added successfully:', response.data);
                fetchPosts(); 
            })
            .catch(error => {
                console.error('Error adding post:', error);
            });
            setShowComments(true);
    };

    const addComment = async (commentData) => {
        try {
            const response = await axios.post('http://localhost:5001/comments/add', commentData);
            console.log('comment added successfully:', response.data);
            if (commentData.commentText) {
                const currentTime = new Date().toLocaleString();
                const newComment = {
                    id: response.data.commentId, 
                    postId: commentData.postId,
                    user: "User",
                    text: commentData.commentText,
                    time: currentTime,
                };
            setComments([...comments, newComment]);
        }
    } catch (error) {
        console.error('Error adding comment from postjs:', error);
      }
    };
    const addReply = (commentId, replyText) => {
        const updatedComments = comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...comment.replies, { id: Date.now(), user: "User", time: new Date().toLocaleString(), user_comment: replyText }]
            };
          }
          return comment;
        });
        setComments(updatedComments);
      };
    
    const fetchCommentsByPostId = async (postId) => {
        console.log("It's coming to this point")
    try {
        const response = await axios.get(`http://localhost:5001/comments/byPostId/${postId}`);
        console.log("w",response.data)
        setComments(existingComments => [...existingComments, ...response.data]);
        // setComments(response.data);
        setCommentsLoaded(true);
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
    };

    const removeItem = (id) => {
        // Remove the post
        console.log("Removing post with id:", id); 
        axios.delete(`http://localhost:5001/posts/${id}`)
            .then(response => {
                console.log('Post deleted successfully:', response.data);
                fetchPosts();
                setComments(comments.filter(comment => comment.postId !== id));
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    };
    

    const removeComment = (id) => {
        const newComments = comments.filter(comment => comment.id !== id);
        setComments(newComments);
    };
      
    return (
        <div>
            {commentsLoaded ? (
            <ul>
                {postItems.map(item => (
                    <PostItem
                        key={item.id}
                        id={item.id}
                        file={item.file}
                        caption={item.caption}
                        rating={item.rating}
                        removeItem={removeItem}
                        removeComment={removeComment}
                        addComment={addComment}
                        addReply={addReply}
                        comments={comments}
                        // comments={comments.filter(comment => comment.postId === item.id)}
                        // fetchCommentsByPostId={() => fetchCommentsByPostId(item.id)}
                    />
                ))}
            </ul>
            ):(
                <p>Loading comments...</p>
            )}
            <PostControl addItem={addItem} />
        </div>
    );
}

export default Post;



