import React, { useState } from "react";

function Caption(props) {
  const [caption, setCaption] = useState(props.value || "");

  const handleCaptionChange = (e) => {
    const newCaption = e.target.value;
    if (newCaption.length > 0 && newCaption.length < 400) {
      setCaption(newCaption); 
      props.onChange(newCaption); 
    }
    
  };

  return (
    <input
      type="text"
      value={caption}
      onChange={handleCaptionChange}
      placeholder="Enter Caption:"
    />
  );
}

export default Caption;

