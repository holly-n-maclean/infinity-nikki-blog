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
  const [selectedTab, setSelectedTab] = useState('write');
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // ✅ Upload and embed image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await Axios.post('http://localhost:5000/api/posts/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const imageUrl = `http://localhost:5000/uploads/${res.data.filename}`;
      const markdownImage = `\n\n![Uploaded Image](${imageUrl})\n`;

      setContent(prev => prev + markdownImage); // insert markdown
      setImagePreview(imageUrl); // show preview

    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Failed to upload image.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    try {
      await Axios.post('http://localhost:5000/api/posts', {
        title,
        content,
        tags
      });

      setSuccess(true);
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
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

        {/* ReactMde Markdown Editor */}
        <div style={{ marginBottom: '1rem' }}>
          <ReactMde
            value={content}
            onChange={setContent}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={markdown =>
              Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
            }
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

        {/* Upload image */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Upload Image</label><br />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {/* Image preview (optional) */}
        {imagePreview && (
          <div style={{ marginTop: '1rem' }}>
            <strong>Preview:</strong><br />
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '0.5rem' }}
            />
          </div>
        )}

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