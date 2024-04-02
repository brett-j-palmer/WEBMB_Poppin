import React, { useState } from "react";

function Comment({ id, user, time, commentText, removeComment, addReply, replies }) {
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

  return (
    <div>
      <div style={{ fontSize: "12px", color: "#777", marginBottom: "5px" }}>
        <span style={{ marginRight: "5px" }}>{user}</span>
        <span>{time}</span>
      </div>
      <div>
        <p style={{ fontSize: "15px", margin: "0" }}>{commentText}</p>
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
        <div>
          {replies && replies.map(reply => (
            <div key={reply.id}>
              <p>{reply.user}: {reply.text}</p>
              <p>{reply.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comment;














