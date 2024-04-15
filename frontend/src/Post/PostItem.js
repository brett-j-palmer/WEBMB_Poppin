import React,{useEffect} from "react";
import heartImage from './heart.png';
import thumbsUpImage from './thumbs-up.png';
import defaultImage from './default_image.png';
import CommentControl from "./CommentControl";
import Comment from "./Comment";
import { useUser } from '../UserContext';
import axios from 'axios';

function PostItem(props) {
    const [liked, setLiked] = React.useState(false);
    const { username: loggedInUsername } = useUser();
    const [isFollowing, setIsFollowing] = React.useState(false);

    useEffect(() => {
        axios.get("http://localhost:5001/users/username/" + loggedInUsername)
            .then(response => {
                const user = response.data;
                if (user && user.liked_posts.includes(props.id)) {
                    setLiked(true);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [loggedInUsername, props.id]);

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
                        console.log("Post Liked Sucessfully");
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

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    return (
         // border radius, can be used to change the shape of corners
        <div style={{ border: "2px solid black", padding: "10px", margin: "15px", borderRadius: "10px", backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ flex: "1", textAlign: "center" }}>
                    <p>Posted by: {props.username}</p>
                    <button onClick={toggleFollow} style={{ marginTop: "2px" }}>
                        {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                </div>
            </div>
            <img src={props.file} width={450} onError={handleImageError} alt="" />
            <p>{props.caption}</p>
            <p>{props.rating}/10</p>
            <p>#{props.tag}</p>
            <button onClick={toggleLike}>
                <img src={liked ? heartImage : thumbsUpImage} alt="Like" style={{ width: "30px", height: "30px" }} />
            </button>
            {loggedInUsername === props.username && (
                <button onClick={() => props.removeItem(props.id)}>Remove Post</button>
            )}
            <CommentControl addComment={props.addComment} postId={props.id} />
            <div>
                {props.comments.map(comment => (
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
    );
}

export default PostItem;





















