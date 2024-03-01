import React from "react";

function Rating(props){
    const handleRatingChange = e =>{
        const newRating = parseInt(e.target.value)
        if (!isNaN(newRating)&& newRating >=1 && newRating <= 10){
            props.onChange(newRating)
        }
    }


    return(
        <input 
            type="number"
            onChange={handleRatingChange} 
            min={0} 
            max = {10}
            placeholder="Rate:" 
            
        />

    );
}
export default Rating;