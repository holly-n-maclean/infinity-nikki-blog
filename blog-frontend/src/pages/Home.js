import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:5000/posts')
            .then(res => {setPosts(res.data);})
            .catch(err => console.error('Error fetching posts:', err));
    }, []);


    return (
        <div>
            {posts.map(post => (
                <div key={post._id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
                    <h2>{post.title}</h2>
                    <img src={`http://localhost:5000/uploads/${post.image}`} alt="" width="300" />
                    <p>{post.content}</p>
                    <p><strong>Tags:</strong> {post.tags.join(', ')}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;