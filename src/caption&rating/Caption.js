import React from "react";
function Caption(props){
    const handleCaptionChange = e =>{
        const newCaption = (e.target.value);
        props.onChange(newCaption);
    }
    return (
            <input 
                type="text" 
                value={props.value}
                onChange={handleCaptionChange}
                placeholder="Enter Caption:"  
            />

    );
    }

export default Caption;

