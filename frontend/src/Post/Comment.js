import React from "react";

function Comment(props) {
    return (
        <div>
            <p>{props.user}: {props.user_comment}</p>
            <button onClick={() => props.removeComment(props.id)}>Remove</button>
        </div>
    );
}

export default Comment;