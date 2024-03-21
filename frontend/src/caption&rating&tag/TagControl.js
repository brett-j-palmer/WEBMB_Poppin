import React, { useState } from 'react';
import Tag from './Tag';

function TagComponent() {
    const [selectedTag, setSelectedTag] = useState('');

    const handleTagChange = (tag) => {
        setSelectedTag(tag);
    };

    return (
        <div>
            <Tag onChange={handleTagChange} selectedTag={selectedTag} />
            {selectedTag && <p>Selected Tag: {selectedTag}</p>}
        </div>
    );
}

export default TagComponent;
