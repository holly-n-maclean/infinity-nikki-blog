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

    const getThumbnailFromContent = (markdown) => {
        const match = markdown.match(/!\[.*?\]\((.*?)\)/);
        return match ? match[1] : null; // Return the URL of the first image found
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };



    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
          <h1 style={{ textAlign: 'center' }}>🧵 Nikki Fashion Blog</h1>
    
          {posts.map(post => {
            const thumbnail = getThumbnailFromContent(post.content) || 'https://via.placeholder.com/300x200?text=No+Image';
    
            return (
              <div key={post._id} style={{
                display: 'flex',
                border: '1px solid #ddd',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                background: '#fff',
                flexDirection: 'row',
              }}>
                <img
                  src={thumbnail}
                  alt="Post thumbnail"
                  style={{ width: '200px', objectFit: 'cover' }}
                />
    
                <div style={{ padding: '1rem', flex: 1 }}>
                  <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none', color: '#222' }}>
                    <h2 style={{ margin: '0 0 0.5rem 0' }}>{post.title}</h2>
                  </Link>
    
                  {/* Post date */}
                  <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '-0.5rem', marginBottom: '0.75rem' }}>
                    {formatDate(post.createdAt)}
                  </p>
    
                  {/* Text preview (without images) */}
                  <p style={{ color: '#555', marginBottom: '1rem' }}>
                    {post.content.replace(/!\[.*?\]\(.*?\)/g, '').substring(0, 140)}...
                  </p>
    
                  {/* Tags */}
                  <div style={{ marginBottom: '1rem' }}>
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          background: '#f0f0f0',
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
    
                  {/* Read more button */}
                  <Link
                    to={`/posts/${post._id}`}
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1rem',
                      background: '#007bff',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '5px',
                      fontSize: '0.9rem',
                    }}
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    
export default Home;