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
        <h1 className="site-title">Luna's Nikki Blog</h1>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <div className="dropdown">
          <span className="dropdown-label">Tags ▾</span>
          <div className="dropdown-menu">
            {/* Add my tags */}
            <Link to="/tags/sweet" className="dropdown-item">#sweet</Link>
            <Link to="/tags/elegant" className="dropdown-item">#elegant</Link>
            <Link to="/tags/fresh" className="dropdown-item">#fresh</Link>
            <Link to="/tags/sexy" className="dropdown-item">#sexy</Link>
            <Link to="/tags/cool" className="dropdown-item">#cool</Link>
          </div>
        </div>
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
