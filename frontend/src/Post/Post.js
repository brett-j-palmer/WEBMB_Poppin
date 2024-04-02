import React, { useState, useEffect, useCallback } from "react";
import PostItem from "./PostItem";
import PostControl from "./PostControl";
import axios from 'axios';

function Post(props) {
    const [postItems, setPostItems] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentsLoaded, setCommentsLoaded] = useState(false); 
    const [setShowComments] = useState(false); 

    const fetchPosts = useCallback(() => {
        axios.get('http://localhost:5001/posts')
            .then(response => {
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
                setCommentsLoaded(true);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    useEffect(() => {
        fetchPosts();
    }, []);

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
          fetchPosts();
      
          const currentTime = new Date().toLocaleString();
          const newComment = {
            id: response.data.commentId,
            postId: commentData.postId,
            user: "User",
            text: commentData.commentText || '',
            time: currentTime,
          };
          setComments([...comments, newComment]);
          fetchCommentsByPostId(commentData.postId);
        } catch (error) {
          console.error('Error adding comment from postjs:', error);
        }
      };

      const addReply = async (commentId, replyText) => {
        try {
            const response = await axios.post('http://localhost:5001/comments/addReply', { commentId, replyText });
            console.log('Reply added successfully:', response.data);
    
            const updatedComments = comments.map(comment => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        replies: [...comment.replies, response.data] 
                    };
                }
                return comment;
            });
            setComments(updatedComments);
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };
    

      const fetchCommentsByPostId = async (postId) => {
        try {
          const response = await axios.get(`http://localhost:5001/comments/byPostId/${postId}`);
          const formattedComments = response.data.map(comment => ({
            id: comment._id,
            postId: comment.postId,
            user: comment.user || 'User',
            text: comment.commentText,
            time: new Date(comment.createdAt).toLocaleString(),
          }));
      
          setComments(prevComments => {
            const existingCommentsForOtherPosts = prevComments.filter(comment => comment.postId !== postId);
            return [...existingCommentsForOtherPosts, ...formattedComments];
          });
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };

    const removeItem = (id) => {
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

    const removeComment = async (commentId) => {
        try {
          const response = await axios.delete(`http://localhost:5001/comments/${commentId}`);
          console.log('Server response:', response.data);
      
          const newComments = comments.filter((comment) => comment.id !== commentId);
          setComments(newComments);
        } catch (error) {
          console.error('Error deleting comment:', error);
        }
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
                        comments={comments.filter(comment => comment.postId === item.id)}
                    />
                ))}
            </ul>
            ):(
                <p>Loading...</p> 
            )}
            <PostControl addItem={addItem} />
        </div>
    );
}

export default Post;
