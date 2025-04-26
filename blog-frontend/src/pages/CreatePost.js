import React, { useState } from 'react';
import Axios from 'axios';
import ReactMarkdown from 'react-markdown';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [imageUpload, setImageUpload] = useState(null); 

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

    const handleImageUpload = async ()=> {
        if (!imageUpload) return; // Check if an image is selected
        const formData = new FormData();
        formData.append('image', imageUpload); // Append the selected image file
        try {
            const res = await Axios.post('http://localhost:5000/upload', formData);
            const fileName = res.data.fileName; // Get the filename from the response
            const url = `http://localhost:5000/uploads/${fileName}`; // Construct the URL for the uploaded image
            setImage(url); 
            } catch (err) {
                console.error('Error uploading image:', err); // Log upload errors
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
                        rows={10}
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

                {/* Upload Image */}
                <div>
                    <label>Image:</label><br />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageUpload(e.target.files[0])}
                    />
                    <button type="button" onClick={handleImageUpload}>Upload Image</button>
                </div>

                {image && (
                    <div>
                        <p>Image uploaded! Paste in your content:</p>
                        <code>![alt text]({imageURL})</code>
                    </div>
                )}

                <br />
                <button type="submit">Create Post</button>
            </form>

            <br />
            <h3>Preview:</h3>
            <ReactMarkdown>{content}</ReactMarkdown>
            </div>
    );
            
}

export default CreatePost; 