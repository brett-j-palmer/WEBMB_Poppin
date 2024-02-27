import React from "react";
import PostItem from "./PostItem";
import PostControl from "./PostControl";

function Post(props) {
    const [postItems, setPostItems] = React.useState([]);


    const addItem = (text, file) => {
        var newItem = {id: postItems.length+1, text: text, file: file}
        var newArray = [...postItems]
        newArray.push(newItem)
        setPostItems(newArray)
    };

    const removeItem = (id) => {
        var newArray = [...postItems].filter((item) => item.id !== id)
        setPostItems(newArray)
    };

    return (
        <div>
            <ul>
                {postItems.map(item => (
                    <PostItem
                        key = {item.id}
                        id = {item.id}
                        file = {item.file}
                        text = {item.text}
                        removeItem = {removeItem}
                    />
                ))}
            </ul>
            <PostControl addItem={addItem} />
        </div>
    );
}

export default Post;

