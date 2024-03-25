import React, { useState } from "react";

function Comment({ id, user, time, user_comment, removeComment, addReply }) {
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = () => {
    if (replyText.trim() !== "") {
      addReply(id, replyText); // Pass comment id along with reply text
      setReplyText("");
      setShowReplyForm(false); // Hide reply form after submission
    }
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  return (
    <div>
      <div style={{ fontSize: "12px", color: "#777", marginBottom: "5px" }}>
        <span style={{ marginRight: "5px" }}>{user}</span>
        <span>{time}</span>
      </div>
      <div>
        <p style={{ fontSize: "15", margin: "0" }}>{user_comment}</p>
        <button onClick={() => removeComment(id)}>Delete</button>
        <button onClick={toggleReplyForm}>Reply</button>
        {showReplyForm && (
          <div>
            <input
              type="text"
              value={replyText}
              onChange={handleReplyChange}
              placeholder="Reply..."
            />
            <button onClick={handleReplySubmit}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;










