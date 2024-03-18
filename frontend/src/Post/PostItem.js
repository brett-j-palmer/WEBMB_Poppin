import React from "react";
import heartImage from './heart.png'
import thumbsUpImage from './thumbs-up.png'

function PostItem(props) {
    const [liked, setLiked] = React.useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        // props.text field can be used for a title if uncommented
        // border radius, can be used to change the shape of corners
        <div style={{ border: "2px solid black", padding: "10px", margin: "15px", borderRadius: "10px", backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
            <img src={props.file} width={450} alt="" /> <br />
            {/* <p>{props.text}</p> <br /> */}
            {props.caption} <br />
            Your rating: {props.rating}/10 <br />
            <button onClick={toggleLike}>
            <img src={liked ? heartImage : thumbsUpImage} alt="Like" style={{ width: "30px", height: "30px" }} />
            </button> <br />
            <button onClick={() => props.removeItem(props.id)}>Remove</button>
        </div>
    );
}

export default PostItem;