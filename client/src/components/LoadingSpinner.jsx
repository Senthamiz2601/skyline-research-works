import React from 'react';
import './states.css';

export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="state-block" role="status">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}
