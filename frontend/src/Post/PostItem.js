// PostItem.js
import React from "react";
import heartImage from './heart.png';
import thumbsUpImage from './thumbs-up.png';
import CommentControl from "./CommentControl"; // Import the CommentControl component

function PostItem(props) {
    console.log("PostItemCreated?", props.id)
    const [liked, setLiked] = React.useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        // props.text field can be used for a title if uncommented
        // border radius, can be used to change the shape of corners
        <div style={{ border: "2px solid black", padding: "10px", margin: "15px", borderRadius: "10px", backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
            <img src={props.file} width={450} alt="" /> <br />
            {props.caption} <br />
            Your rating: {props.rating}/10 <br />
            <button onClick={toggleLike}>
                <img src={liked ? heartImage : thumbsUpImage} alt="Like" style={{ width: "30px", height: "30px" }} />
            </button> <br />
            <button onClick={() => {
                console.log(props.id)
                props.removeItem(props.id)}}>Remove Post</button>
            
            {/* Add CommentControl for adding comments */}
            <CommentControl addComment={props.addComment} postId={props.id} />

            {/* Display comments associated with this post */}
            <div>
                {props.comments.map(comment => (
                    <div key={comment.id}>
                        <p>{comment.user} - {comment.time}</p>
                        <p>{comment.user_comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default PostItem;






