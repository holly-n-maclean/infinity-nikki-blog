import React, { useState } from 'react';
import Axios from 'axios';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setSuccess(false); // Reset success state


        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('tags', tags.split(','));
        if (image) { formData.append('image', image); } // Append image file if there is one

        try {
            await Axios.post('http://localhost:5000/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTitle(''); // Reset title input
            setContent(''); // Reset content input
            setTags(''); // Reset tags input
            setImage(null); // Reset image input
        } catch (error) {
            console.error('error creating post:', error);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Create New Blog Post</h2>
            {success && <p style={{ color: 'green' }}>Post created!</p>}
            
            <form onSubmit={handleSubmit}>
                {/* Title input */}
                <div>
                    <label>Title:</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Content input */}
                <div>
                    <label>Content:</label><br />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={6}
                    />
                </div>

                {/* Tags input */}
                <div>
                    <label>Tags (comma separated):</label><br />
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>

                {/* Image file input */}
                <div>
                    <label>Image:</label><br />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                <br />
                <button type="submit">Create Post</button>
            </form>
            </div>
    );
            
}

export default CreatePost; 