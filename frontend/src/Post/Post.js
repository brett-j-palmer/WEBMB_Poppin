import React, { useState, useEffect, useCallback } from "react";
import PostItem from "./PostItem";
import PostControl from "./PostControl";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useUser } from '../UserContext'; 

function Post(props) {
    const [postItems, setPostItems] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentsLoaded, setCommentsLoaded] = useState(false); 
    const [setShowComments] = useState(false); 
    const {state} = useLocation();
    const { username: myusername} = state;
    const { username } = useUser();

    const fetchPosts = useCallback(() => {
        axios.get('http://localhost:5001/posts')
            .then(response => {
                const postsWithIds = response.data.map(post => ({
                    id: post._id,
                    username: post.username,
                    file: post.file,
                    caption: post.caption,
                    rating: post.rating,
                    tag: post.tag
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
                var postID = response.data.postId;
                console.log("PostID", postID)

                axios.get("http://localhost:5001/users/username/" + myusername)
                .then(response => {
                    var user = response.data;
    
                    user.created_posts.push(postID);
    
                    axios.put("http://localhost:5001/users/" + user._id, user)
                    .then(response => {
                        console.log("Post Created Sucessfully");
                    })
                    .catch(error => {
                        console.log("Error,", error);
        
                    });
                    
                })            
                .catch(error => {
                    console.error('Error creating post:', error)
                })

                fetchPosts(); 
            })
            .catch(error => {
                console.error('Error adding post:', error);
            });
        setShowComments(true); 
    };

    const addComment = async (commentData) => {
        try {
            const response = await axios.post('http://localhost:5001/comments/add', {
                ...commentData,
                user: username,
              });          console.log('comment added successfully:', response.data);
          fetchPosts();
      
          const currentTime = new Date().toLocaleString();
          
          const newComment = {
            id: response.data.commentId,
            postId: commentData.postId,
            user: username,
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


            axios.get("http://localhost:5001/users/username/" + myusername)
            .then(response => {
                var user = response.data;

                var index = user.created_posts.indexOf(id);
                if (index > -1) {
                    user.created_posts.splice(index, 1);
                }

                axios.put("http://localhost:5001/users/" + user._id, user)
                .then(response => {
                    console.log("Post Removed Sucessfully");
                })
                .catch(error => {
                    console.log("Error,", error);
                });
            })            
            .catch(error => {
                console.error('Error liking post:', error)
            })
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
                        username={item.username}
                        file={item.file}
                        caption={item.caption}
                        rating={item.rating}
                        tag = {item.tag}
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
            <PostControl addItem={addItem} username={myusername} />
        </div>
    );
}
export default Post;