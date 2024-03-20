import React from "react";
import Caption from "../caption&rating/Caption"
import Rating from '../caption&rating/Rating'
function PostControl(props) {
    const [text, setText] = React.useState("");
    const [file, setFile] = React.useState();
    const [caption, setCaption] = React.useState("");
    const [rating, setRating] = React.useState("");

    const onChange = e => {
        setText(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.addItem({ text, file, caption, rating }); // Pass post data as an object
        setText("");
        setCaption("");
        setRating("");
        // setFile("");
    }

    const handleCaptionChange = value =>{
        setCaption(value);
        }
    const handleRatingChange= value =>{
        setRating(value);
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
            {/* <input type="text" name="text" value={text} onChange={onChange} data-testid="new_item_text" placeholder="Enter Text Here..." /> */}
                <input type="file" onChange={handleChange} />
            <Caption value={caption} onChange={handleCaptionChange}/>
            <Rating value={rating} onChange={handleRatingChange}/>
            <input type="submit" value="Create Post" data-testid="item_submit" />
            
        </form>
    );
}

