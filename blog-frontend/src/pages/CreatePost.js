import React, { useState } from 'react';
import Axios from 'axios';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css'
import { useNavigate } from 'react-router-dom';
function CreatePost() {
    const navigate = useNavigate(); 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [selectedTab, setSelectedTab] = useState('write'); 
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setSuccess(false); // Reset success state
        let imageUrl = ''; // Initialize imageURL to null
        try {
            if (image) {
              const formData = new FormData();
              formData.append('image', image);
      
              const uploadRes = await Axios.post('http://localhost:5000/api/posts/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
              });
      
              imageUrl = `/uploads/${uploadRes.data.filename}`;
            }
      
            const finalContent = imageUrl
              ? `${content}\n\n![Uploaded Image](${imageUrl})`
              : content;
      
            await Axios.post('http://localhost:5000/api/posts', {
              title,
              content: finalContent,
              tags
            });
      
            navigate('/');
          } catch (error) {
            console.error('Error creating post:', error);
          }
        };
      
        return (
          <div className="container">
            <h1>Create a New Post</h1>
      
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Post Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>
      
              {/* Markdown editor */}
              <div style={{ marginBottom: '1rem' }}>
                <ReactMde
                  value={content}
                  onChange={setContent}
                  selectedTab={selectedTab}
                  onTabChange={setSelectedTab}
                  generateMarkdownPreview={markdown =>
                    Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
                  }
                  minEditorHeight={200}
                />
              </div>
      
              {/* Tags */}
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>
      
              {/* Image upload */}
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
      
              {/* Submit button */}
              <button
                type="submit"
                style={{
                  padding: '0.7rem 1.5rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Create Post
              </button>
            </form>
         </div>
    );
}
export default CreatePost;