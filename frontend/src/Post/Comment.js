import React, { useState } from "react";

function Comment({ id, user, time, commentText, removeComment, addReply }) {
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = () => {
    if (replyText.trim() !== "") {
      addReply(id, replyText); 
      setReplyText("");
      setShowReplyForm(false); 
    }
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };
  console.log("t",commentText,id,time)
  return (
    <div>
      <div style={{ fontSize: "12px", color: "#777", marginBottom: "5px" }}>
        <span style={{ marginRight: "5px" }}>{user}</span>
        <span>{time}</span>
      </div>
      <div>
        <p style={{ fontSize: "15", margin: "0" }}>{commentText}</p>
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










