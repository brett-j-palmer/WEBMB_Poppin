import React from "react";

function Tag(props){
    const handleTagChange = e =>{
        const selectedTag = e.target.value;
        if(selectedTag === "movie" || selectedTag === "book" || selectedTag==="game" || selectedTag==="music"){
            props.onChange(selectedTag)
        }
            
    }


    return(
        <label>
            Tag:
            <select onChange={handleTagChange} defaultValue="">
                <option value="" disabled>Select tag</option>
                <option value="movie">Movie</option>
                <option value="music">Music</option>
                <option value="book">Book</option>
                <option value="game">Game</option>

            </select>
        </label>

    );
}
export default Tag;