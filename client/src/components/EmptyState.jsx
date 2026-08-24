import React from 'react';
import './states.css';

export default function EmptyState({ title = 'Nothing here yet', message }) {
  return (
    <div className="state-block">
      <p className="state-block__title">{title}</p>
      {message && <p>{message}</p>}
    </div>
  );
}
