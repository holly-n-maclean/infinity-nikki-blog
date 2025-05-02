import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Axios from 'axios';
import axios from 'axios';

function PostPage() {
    const { id } = useParams(); // Get postID from URL
    const { post, setPost } = useState(null);

    useEffect(() => {
        axios.get(`api/posts/${id}`)
        .then((response) => {
            setPost((response.data));
        })

        .catch(error => {
            console.error('Error fetching post:', error);
        });
    }, [id]);

    if (!post) return <div>Loading..</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>{post.title}</h1>

            <ReactMarkdown
                children={post.content}
                components={{
                    img: ({ node, ...props }) => (
                        <img
                            {...props}
                            alt={props.alt}
                            style={{ maxWidth: '100%', margin: '1rem 0' }}
                        />
                    )
                }}
            />

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

  