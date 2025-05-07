import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import TagPage from './pages/TagPage';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#f0f0f0', marginBottom: '2rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/create" style={{
          background: '#007bff',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          textDecoration: 'none'
        }}>
          Create Post
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />
        <Route path="/tags/:tag" element={<TagPage />} />
      </Routes>
    </Router>
  );
}

export default App;
