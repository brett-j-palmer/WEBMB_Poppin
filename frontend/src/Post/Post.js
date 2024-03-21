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
    const currentUser = "User"; 

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
                    rating: post.rating,
                    tag: post.tag
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
            setShowComments(true);
    };

    const addComment = (postId, user_comment) => {
        if (user_comment) {
            const currentTime = new Date().toLocaleString();
            const newComment = {
                id: comments.length + 1,
                postId: postId, // Associate the comment with the post
                user: "User", 
                user_comment: user_comment,
                time: currentTime,
            };
            setComments([...comments, newComment]);
        }
    };
    

    const removeItem = (id) => {
        // Remove the post
        console.log("Removing post with id:", id); // Log the id
        axios.delete(`http://localhost:5001/posts/${id}`)
            .then(response => {
                console.log('Post deleted successfully:', response.data);
                fetchPosts(); // Fetch posts after successful deletion
                // Remove comments associated with the deleted post
                setComments(comments.filter(comment => comment.postId !== id));
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
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
                        caption={item.caption}
                        rating={item.rating}
                        tag = {item.tag}
                        removeItem={removeItem}
                        addComment={addComment}
                        comments={comments.filter(comment => comment.postId === item.id)}
                    />
                ))}
            </ul>
            <PostControl addItem={addItem} />
        </div>
    );
}

export default Post;



