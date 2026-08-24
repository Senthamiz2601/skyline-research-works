import React from 'react';
import './states.css';

export default function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="state-block state-block--error" role="alert">
      <p>{message}</p>
      {onRetry && <button className="state-block__retry" onClick={onRetry}>Try again</button>}
    </div>
  );
}
