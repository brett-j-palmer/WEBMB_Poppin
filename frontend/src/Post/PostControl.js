import React from "react";
import Caption from "../caption&rating&tag/Caption";
import Rating from '../caption&rating&tag/Rating';
import Tag from "../caption&rating&tag/Tag";

function PostControl(props) {
    const [text, setText] = React.useState("");
    const [file, setFile] = React.useState();
    const [caption, setCaption] = React.useState("");
    const [rating, setRating] = React.useState("");
    const [tag, setTag] = React.useState("");
    const[username, setUsername] = React.useState(props.username);


    const onChange = e => {
        setText(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        console.log("Username",username)
        console.log(caption)
        
        props.addItem({ username, text, file, caption, rating, tag });
        setText("");
        setCaption("");
        setRating("");
        setTag("");
    };

    const handleCaptionChange = value => {
        setCaption(value);
    };

    const handleRatingChange = value => {
        setRating(value);
    };

    const handleTagChange = value => {
        setTag(value);
    }

    function handleChange(e) {
        console.log(e.target.files);
        // Check if a file was selected
        if (e.target.files && e.target.files[0]) {
            // Set the file URL to the state
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange} />
            <Caption value={caption} onChange={handleCaptionChange}/>
            <Rating value={rating} onChange={handleRatingChange}/>
            <Tag value={tag} onChange={handleTagChange}/>
            <input type="submit" value="Create Post" data-testid="item_submit" />
        </form>
    );
}
export default PostControl;


