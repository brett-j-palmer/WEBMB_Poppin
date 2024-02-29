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
        props.addItem(text, file, caption, rating)
        setText("");
        setCaption("");
        setRating("")
        // setFile("");
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
            <ul><input type="text" name="text" value={text} onChange={onChange} data-testid="new_item_text" placeholder="Enter Text Here..." /></ul>
            <ul><input type="file" onChange={handleChange} /></ul>
            <Caption onChange={setCaption}/>
            <Rating onChange={setRating}/>

            <ul><input type="submit" value="Create Post" data-testid="item_submit" /></ul>
        </form>
    );
}

export default PostControl;

