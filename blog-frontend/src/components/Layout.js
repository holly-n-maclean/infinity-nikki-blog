import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#fce4ec', color: '#4a4a4a' }}>
          
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#dceeff' }} className="text-slate-800 py-6 mt-12">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Luna's Nikki Blog. All rights reserved.</p>
          <p className="mt-2">Crafted with 💕 By Holly MacLean</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
