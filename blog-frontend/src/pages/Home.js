import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        Axios.get('http://localhost:5000/api/posts')
            .then(res => {setPosts(res.data);})
            .catch(err => console.error('Error fetching posts:', err));
    }, []);

    return (
        <div className="container">
            <h1>Nikki Fashion Blog Posts</h1>
            {posts.map(post => (
                <div key={post._id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
                    <Link
                        to={`/posts/${post._id}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                        >
                        <h2>{post.title}</h2>
                    </Link>
                    <p style={{ color: '#555' }}>
                        {post.content.substring(0, 100)}...
                    </p>
                    <div style={{ marginTop: '1rem' }}>
                        {post.tags.map((tag, index) => (
                            <span
                                key={index}
                                style={{
                                    background: '#eee',
                                    borderRadius: '5px',
                                    padding: '3px 8px',
                                    marginRight: '5px',
                                    fontSize: '0.8rem',
                                }}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Home;