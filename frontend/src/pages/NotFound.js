import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center" style={{ paddingTop: '80px' }}>
      <h1 style={{ fontSize: '72px', color: '#2e7d32' }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
