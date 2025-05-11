import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import TagPage from './pages/TagPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <nav className="top-nav">
    <div className="nav-container">
      <div className="logo-area">
        <div className="logo-circle">N</div>
        <h1 className="site-title">Nikki Blog</h1>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/tags">Tags</Link>
      </div>
    </div>
  </nav>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/create" element={<Layout><CreatePost /></Layout>} />
        <Route path="/posts/:id" element={<Layout><PostPage /></Layout>} />
        <Route path="/posts/edit/:id" element={<Layout><EditPost /></Layout>} />
        <Route path="/tags/:tag" element={<Layout><TagPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
