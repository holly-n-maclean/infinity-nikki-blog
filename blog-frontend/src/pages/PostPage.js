import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import ReactMarkdown from 'react-markdown';
import TagList from '../components/TagList';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [deletedMessage, setDeletedMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => {
        if (err.response?.status === 404) {
          setPost(null);
        } else {
          alert('Failed to load post. Check console.');
          console.error('Error loading post:', err);
        }
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await Axios.delete(`http://localhost:5000/api/posts/${id}`);
        setDeletedMessage('Post deleted successfully!');
        setTimeout(() => navigate('/'), 1500);
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  if (!post) return <div>Loading...</div>;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>{post.title}</h1>

      {/* Optional: Post Date */}
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Posted on {formatDate(post.createdAt)}
      </p>

      {/* Post Content with styled images */}
      <div className="post-content" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
        <ReactMarkdown
          components={{
            img: ({ node, ...props }) => (
              <img
                {...props}
                style={{
                  maxWidth: '100%',
                  borderRadius: '12px',
                  margin: '1.5rem 0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'block'
                }}
                alt={props.alt || ''}
              />
            )
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Tags */}
      <TagList tags={post.tags} />

      {/* Deleted message */}
      {deletedMessage && (
        <div style={{ marginTop: '1.5rem', color: 'green', fontWeight: 'bold' }}>
          {deletedMessage}
        </div>
      )}

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        style={{
          marginTop: '2rem',
          padding: '0.6rem 1.2rem',
          background: '#ff4d4d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Delete Post
      </button>

      <button
        onClick={() => navigate(`/posts/edit/${id}`)}
        style={{
          marginLeft: '1rem',
          padding: '0.6rem 1.2rem',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        >
        Edit Post
      </button>
    </div>
  );
}

export default PostPage;


  