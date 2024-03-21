// Comment.js
import React from "react";

function Comment(props) {
    return (
        <div>
            <h6>
                <span style={{ fontSize: "12px", marginRight: "5px" }}>{props.user}</span>
                <span style={{ fontSize: "12px", color: "#777" }}>{props.time}</span>
            </h6>
            <p style={{ fontSize: "5px" }}>{props.user_comment}</p>
            <button onClick={() => props.removeComment(props.id)}>Remove</button>
        </div>
    );
}

export default Comment;



