import React from 'react';
import { Link } from 'react-router-dom';
import './shared.css';

export default function NotFound() {
  return (
    <section className="page-header">
      <div className="container">
        <h1>404 — Page Not Found</h1>
        <p><Link to="/">Go back home</Link></p>
      </div>
    </section>
  );
}
