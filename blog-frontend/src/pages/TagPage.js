import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import Axios from 'axios'; 
import TagList from '../components/TagList';

function TagPage() {
    const { tag } = useParams(); // Get the tag from the URL
    const [posts, setPosts] = useState([]); // State to hold posts with the specified tag

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/posts/tag/${tag}`) // Fetch posts with the specified tag
        .then((res) => setPosts(res.data))
        .catch((err) => {
          console.error('Error fetching posts by tag:', err);
          setPosts([]);
        });

    }, [tag]); 

    return (
        <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
            <h1 style={{ marginBottom: '1rem' }}>Posts tagged with: <em>#{tag}</em></h1>

            {posts.length === 0 ? (
                <p>No posts found for this tag.</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #ddd' }}>
                        <h2>{post.title}</h2>
                        <p>{post.content.substring(0, 200)}...</p> 
                        <TagList tags={post.tags} />
                    </div>

                ))
            )}
        </div>

    );

}

export default TagPage;
