import React, { useState } from "react";

function CommentControl({ addComment, postId }) {
    const [commentText, setCommentText] = useState("");

    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleSubmitComment = () => {
        if (commentText.trim() !== "") {
            addComment(postId, commentText); // Pass postId along with comment text
            setCommentText("");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Add a comment: "
                value={commentText}
                onChange={handleCommentChange}
            />
            <button onClick={handleSubmitComment}>Submit Comment</button>
        </div>
    );
}

export default CommentControl;




