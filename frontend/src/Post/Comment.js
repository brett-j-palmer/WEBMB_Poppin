import React from "react";

function Comment(props) {
    return (
        <div>
            <h8>{props.user} - {props.time}</h8>
            <p>{props.userComment}</p>
            <button onClick={() => props.removeComment(props.id)}>Remove</button>
        </div>
    );
}
export default Comment