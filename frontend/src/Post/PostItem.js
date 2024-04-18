import React, { useEffect, useState } from "react";
import heartImage from './heart.png';
import thumbsUpImage from './thumbs-up.png';
import defaultImage from './default_image.png';
import commentImage from './Comment.png';
import CommentControl from "./CommentControl";
import Comment from "./Comment";
import { useUser } from '../UserContext';
import axios from 'axios';
import './PostItem.css';

function PostItem(props) {
    const [liked, setLiked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const { username: loggedInUsername } = useUser();

    useEffect(() => {
        axios.get("http://localhost:5001/users/username/" + loggedInUsername)
            .then(response => {
                const user = response.data;
                if (user && user.followed_users.includes(props.username)) {
                    setIsFollowing(true);
                }
                if (user && user.liked_posts.includes(props.id)) {
                    setLiked(true);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [loggedInUsername, props.id, props.username]);

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
        axios.get("http://localhost:5001/users/username/" + loggedInUsername)
            .then(response => {
                var user = response.data;
                if (!isFollowing) {
                    user.followed_users.push(props.username);
                } else {
                    var index = user.followed_users.indexOf(props.username);
                    if (index > -1) {
                        user.followed_users.splice(index, 1);
                    }
                }
                axios.put("http://localhost:5001/users/" + user._id, user)
                    .then(response => {
                        console.log("Toggle follow successful");
                    })
                    .catch(error => {
                        console.log("Error:", error);
                    });
            })
            .catch(error => {
                console.error('Error following the user', error)
            });
    };

    const toggleLike = () => {
        setLiked(!liked);
        console.log("Liking post with id:", props.id);
        axios.get("http://localhost:5001/users/username/" + loggedInUsername)
            .then(response => {
                var user = response.data;
                if (!liked) {
                    user.liked_posts.push(props.id);
                } else {
                    var index = user.liked_posts.indexOf(props.id);
                    if (index > -1) {
                        user.liked_posts.splice(index, 1);
                    }
                }
                axios.put("http://localhost:5001/users/" + user._id, user)
                    .then(response => {
                        console.log("Post Liked Successfully");
                    })
                    .catch(error => {
                        console.log("Error,", error);
                    });
            })
            .catch(error => {
                console.error('Error liking post:', error)
            })
    };

    const handleImageError = (event) => {
        event.target.src = defaultImage;
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };
    
    return (
        <div className="post-item" style={{ border: "2px solid black", padding: "10px", margin: "10px", borderRadius: "5px", backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ marginBottom: "10px" }}> 
                        <p style={{ margin: 0, fontSize: "30px" }}>@{props.username}</p>
                        <img src={props.file} style={{maxWidth: "300px", maxHeight: "250px", width: "auto", height: "auto"}} onError={handleImageError} alt="" />
                    </div>
                </div>

                <div>
                    <p style={{ margin: 15, fontSize: "25px", maxWidth: "300px" }}>{props.caption}</p>
                </div>

                <div style = {{margin: 15}}>
                    <p>{props.rating}/10</p>
                    <p style = {{fontSize: "30px"}}>#{props.tag}</p>
                    {loggedInUsername === props.username && (
                        <p><button onClick={() => props.removeItem(props.id)}>Remove Post</button></p>
                    )}
                </div>

                <div>
                    <button onClick={toggleLike}>
                        <img src={liked ? heartImage : thumbsUpImage} alt="Like" style={{ width: "30px", height: "30px" }} />
                    </button>
                </div>

                <div>
                    <button onClick={toggleComments}> <img src={commentImage} alt="Comments" style={{ width: "30px", height: "30px" }} /> </button>
                    <div id="CreateComment">
                        {showComments && (
                        <CommentControl addComment={props.addComment} postId={props.id} />
                    )}
                    </div>
                    {showComments && props.comments.map(comment => (
                        <Comment
                            key={`${props.id}-${comment.id}`}
                            id={comment.id}
                            user={comment.user}
                            time={comment.time}
                            commentText={comment.text}
                            removeComment={props.removeComment}
                            addReply={props.addReply}
                        />
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default PostItem;
