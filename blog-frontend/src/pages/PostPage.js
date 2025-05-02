import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Axios from 'axios';

function PostPage() {
    const { id } = useParams(); // Get postID from URL
    const { post, setPost } = useState(null);
    useEffect(() => {
        Axios.get(`http://localhost:5000/api/posts/${id}`)
        .then((response) => {
            setPost((response.data));
        })
        .catch(error => {
            console.error('Error fetching post:', error);
        });
    }, [id]);
    if (!post) return <div>Loading..</div>;
    return (
        <div className="container">
            <h1>{post.title}</h1>
            {/* Render the post content as Markdown */}
            <div className="post-content" style={{ marginTop: '2rem' }}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
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
        </div>
    );
}
export default PostPage;

  