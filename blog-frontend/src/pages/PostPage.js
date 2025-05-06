import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostPage() {
    const { id } = useParams(); // Get postID from URL
    const [ post, setPost ] = useState(null);
    const navigate = useNavigate(); // For navigation after deletion
    const [deletedMessage, setDeletedMessage] = useState(null); // For deleted message
    useEffect(() => {
        Axios.get(`http://localhost:5000/api/posts/${id}`)
        .then(res => setPost(res.data))
        .catch(err => {
            if (err.response?.status === 404) {
              setPost(null); // post doesn't exist
            } else {
              alert('Failed to load post. Check console.');
              console.error('Error loading post:', err);
            }
        });
    }, [id]);

    // delete post
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
          try {
            await Axios.delete(`http://localhost:5000/api/posts/${id}`);
            setDeletedMessage('Post deleted successfully!'); // Set the message
            setTimeout(() => navigate('/'), 1500); // Redirect after 1.5 seconds
          } catch (error) {
            console.error('Failed to delete post:', error);
            console.log(`Trying to delete post: ${id}`);
          }
        }
      };

    if (!post) return <div>Loading..</div>;

    return (
        <div className="container">
            <h1>{post.title}</h1>
            {/* Render the post content as Markdown */}
            <div className="post-content" style={{ marginTop: '2rem' }}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    img: ({ node, ...props }) => (
                        <img
                            {...props}
                            style={{
                                maxWidth: '100%',
                                borderRadius: '8px',
                                margin: '1rem 0',
                                display: 'block',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            }}
                            alt={props.alt || ''}
                        />
                    ),
                }}
            >
                {post.content}
            </ReactMarkdown>
            </div>
            <div style={{ marginTop: '1rem' }}>
                {post.tags.map((tag, index) => (
                    <span
                        key={index}
                        style={{
                            background: '#eee',
                            borderRadius: '5px',
                            padding: '5px 10px',
                            marginRight: '5px',
                            fontSize: '0.9rem',
                        }}
                    >
                        #{tag}
                    </span>
                ))}
            </div>
            {deletedMessage && (
                <div style={{ marginTop: '1rem', color: 'green' }}>
                    {deletedMessage}
                </div>
            )}
            <button
                onClick={handleDelete}
                style={{
                    marginTop: '2rem',
                    padding: '0.5rem 1rem',
                    background: '#ff4d4d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Delete Post
            </button>
        </div>
    );
}
export default PostPage;

  