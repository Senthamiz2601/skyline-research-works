import React from 'react';
import './cards.css';

export default function InternshipCard({ internship, onApply }) {
  return (
    <div className="card">
      <div className="card__body">
        <span className="card__tag">{internship.domain}</span>
        <h3>{internship.title}</h3>
        <p>{internship.description}</p>
        <div className="card__meta"><span>Duration: {internship.duration}</span></div>
        {internship.technologies?.length > 0 && (
          <div className="card__chips">
            {internship.technologies.map((t) => <span key={t}>{t}</span>)}
          </div>
        )}
        <button className="card__link" onClick={() => onApply?.(internship)}>Apply →</button>
      </div>
    </div>
  );
}
