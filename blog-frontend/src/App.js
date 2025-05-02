import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostPage from './pages/PostPage';

function App() {
  return (
    <Router>
      {/*Navigation Bar*/}
      <nav style={{ padding: '1rem', background: '#f0f0f0', marginBottom: '2rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/create" style={{ background: '#007bff', color: 'white', padding: '0.5rem 1rem', borderRadius: '5px', textDecoration: 'none' }}>Create Post
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
