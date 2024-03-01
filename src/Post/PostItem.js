import React from "react";

function PostItem(props) {
    return (
        <div>
            <img src={props.file} width={450} alt="" />
            <p>{props.text}</p>
            <p>Caption: {props.caption}</p>
            <p>Rating:{props.rating}/10</p>
            <button onClick={() => props.removeItem(props.id)}>Remove</button>
        </div>
    );
}

export default PostItem;